/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TextFormatting {
  fontName: string;
  fontSize: number;
  color: [number, number, number];
}

export async function getPdfLib(): Promise<any> {
  return await import("pdf-lib");
}

export async function getPako(): Promise<any> {
  return await import("pako");
}

function extractFormatting(content: string, searchStr: string): TextFormatting | null {
  const textIndex = content.indexOf(searchStr);
  if (textIndex === -1) return null;

  const before = content.substring(0, textIndex);

  const fontMatch = before.match(/\/([\w+.-]+)\s+([\d.]+)\s+Tf/g);
  let fontName = "";
  let fontSize = 11;
  if (fontMatch) {
    const parts = fontMatch[fontMatch.length - 1]!.match(/\/([\w+.-]+)\s+([\d.]+)\s+Tf/);
    if (parts) {
      fontName = parts[1]!;
      fontSize = parseFloat(parts[2]!);
    }
  }

  const color: [number, number, number] = [0, 0, 0];
  const colorPatterns = [
    /([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+rg/g,
    /([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+RG/g,
    /([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+scn/g,
    /([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+SCN/g,
  ];
  for (const pattern of colorPatterns) {
    const matches = before.match(pattern);
    if (matches) {
      const parts = matches[matches.length - 1]!.match(/([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
      if (parts) {
        color[0] = parseFloat(parts[1]!);
        color[1] = parseFloat(parts[2]!);
        color[2] = parseFloat(parts[3]!);
      }
      break;
    }
  }

  return { fontName, fontSize, color };
}

function getContentStreams(pdfDoc: any, page: any, pdfLib: any): any[] {
  const node = page.node;
  if (!node) return [];

  const contents = typeof node.Contents === "function" ? node.Contents() : undefined;
  if (!contents) return [];

  const streams: any[] = [];

  if (contents.constructor === pdfLib.PDFArray) {
    for (let i = 0; i < contents.size(); i++) {
      const ref = contents.get(i);
      const stream = pdfDoc.context.lookup(ref);
      if (stream) streams.push(stream);
    }
  } else {
    const stream =
      contents.constructor === pdfLib.PDFRef
        ? pdfDoc.context.lookup(contents)
        : contents;
    if (stream) streams.push(stream);
  }

  return streams;
}

export function findTextFormatting(
  pdfDoc: any,
  page: any,
  pako: any,
  pdfLib: any,
  text: string,
): TextFormatting | null {
  const streams = getContentStreams(pdfDoc, page, pdfLib);
  const searchStr = `(${text})`;

  for (const stream of streams) {
    if (!stream || !("content" in stream)) continue;
    try {
      const decompressed = pako.inflate(stream.content as Uint8Array);
      const contentStr = new TextDecoder().decode(decompressed);
      const fmt = extractFormatting(contentStr, searchStr);
      if (fmt) return fmt;
    } catch {
      /* skip */
    }
  }

  return null;
}

export async function replaceTextInPdf(
  pdfDoc: any,
  pako: any,
  pdfLib: any,
  oldText: string,
  newText: string,
): Promise<boolean> {
  const PDFName = pdfLib.PDFName;
  const PDFNumber = pdfLib.PDFNumber;
  let replaced = false;
  const searchStr = `(${oldText})`;
  const replaceStr = `(${newText})`;

  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const streams = getContentStreams(pdfDoc, page, pdfLib);
    if (streams.length === 0) continue;

    for (const stream of streams) {
      if (!stream || !("content" in stream)) continue;

      try {
        const decompressed = pako.inflate(stream.content as Uint8Array);
        const contentStr = new TextDecoder().decode(decompressed);

        if (!contentStr.includes(searchStr)) continue;

        const modifiedContent = contentStr.replace(searchStr, replaceStr);
        const recompressed = pako.deflate(new TextEncoder().encode(modifiedContent));

        stream.content = recompressed;

        const dict = stream.dict;
        if (dict && typeof dict.set === "function") {
          dict.set(PDFName.of("Length"), PDFNumber.of(recompressed.length));
        }

        replaced = true;
      } catch {
        /* skip non-deflate streams */
      }
    }
  }

  return replaced;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
