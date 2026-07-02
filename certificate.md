You are a Senior Full Stack Engineer, UI/UX Designer, and Software Architect.

Your task is to build a complete, production-ready Certificate Generation module for my existing E-Learning Platform built with Next.js.

The implementation must follow clean architecture, reusable components, excellent UX, and modern TypeScript best practices.

==========================================================
PROJECT STACK
==========================================================

The project is already configured with:

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Aceternity UI
- Magic UI
- Framer Motion
- Lucide React
- Animate Icons
- React Hook Form
- TanStack Table

DO NOT recreate or reconfigure the project.

Implement only the Certificate Generation feature.

==========================================================
CONTEXT
==========================================================

The platform contains different user roles.

One of them is the Instructor.

The Instructor has a Dashboard.

Inside the dashboard there is a Students Table.

Each row represents one student.

Each row must contain an action button:

"Export Certificate"

When clicked, the instructor can generate the student's certificate.

==========================================================
VERY IMPORTANT
==========================================================

I already designed the certificate in Adobe Illustrator.

The certificate already exists.

Location:

public/certificates/certificate.pdf

DO NOT redesign it.

DO NOT convert it to HTML.

DO NOT create another certificate.

The PDF itself is the certificate template.

==========================================================
PDF TEMPLATE
==========================================================

The PDF is a Fillable PDF.

The following form fields already exist inside the PDF.

Use these names EXACTLY.

studentFullName

durationF

formationDate

certificateId

instructorName

academyName

These names MUST NOT be changed.

==========================================================
PDF RULES
==========================================================

DO NOT draw text using x/y coordinates.

DO NOT recreate the certificate.

DO NOT replace fonts.

DO NOT change typography.

DO NOT change alignment.

DO NOT modify font size.

DO NOT modify colors.

DO NOT replace styling.

DO NOT modify the layout.

Simply fill the existing PDF form fields while preserving the exact Adobe Illustrator design.

After filling the fields:

Flatten the PDF.

The generated certificate must no longer contain editable form fields.

==========================================================
LIBRARY
==========================================================

Use ONLY

pdf-lib

for PDF manipulation.

Do not use any other PDF library.

Lazy-load pdf-lib only when generating the certificate.

==========================================================
DATA
==========================================================

Assume each student row already contains:

{
studentFullName,
durationF,
formationDate,
certificateId,
instructorName,
academyName
}

These values must populate the PDF automatically.

==========================================================
FEATURES
==========================================================

Create a reusable architecture.

Suggested structure:

components/
certificate/
ExportCertificateButton.tsx
CertificateDialog.tsx
CertificatePreviewCard.tsx
CertificateLoading.tsx

lib/
certificate.ts

utils/
generateCertificate.ts

types/
certificate.ts

hooks/
useGenerateCertificate.ts

Feel free to improve the structure if necessary.

==========================================================
USER FLOW
==========================================================

Instructor Dashboard

↓

Students Table

↓

Click

Export Certificate

↓

Open Dialog

↓

Display

Student Name

Instructor Name

Academy Name

Training Duration

Formation Date

Certificate ID

↓

Generate Certificate

↓

Show loading animation

↓

Generate PDF

↓

Automatically download

↓

Show success toast

==========================================================
UI DESIGN
==========================================================

The interface must feel premium.

Inspired by:

- GitHub
- Vercel
- Stripe
- Linear
- Coursera
- LinkedIn Learning
- Udemy Business

Use:

shadcn/ui

Dialog

Card

Button

Badge

Tooltip

Hover Card

Separator

Skeleton

Toast

Scroll Area

Alert Dialog if needed.

Use subtle animations.

Use Framer Motion.

Use Animate Icons.

==========================================================
COLOR PALETTE
==========================================================

Primary

#18476F

Secondary

#2563EB

Dark

#0F172A

Gray

#334155

Accent

#06B6D4

Success

#10B981

Background

#F8FAFC

Follow this design system consistently.

==========================================================
EXPORT BUTTON
==========================================================

Modern rounded button.

Icon:

Certificate

Hover animation.

Loading spinner while generating.

Disabled while loading.

==========================================================
DIALOG
==========================================================

Modern responsive dialog.

Show:

Student Name

Instructor

Academy

Training Duration

Formation Date

Certificate ID

Generate Button

Cancel Button

Nice spacing.

Professional layout.

==========================================================
CERTIFICATE GENERATION
==========================================================

Create a reusable function

generateCertificate()

The function receives

{
studentFullName,
durationF,
formationDate,
certificateId,
instructorName,
academyName
}

Workflow:

Load

public/certificates/certificate.pdf

↓

Open using pdf-lib

↓

Get the PDF Form

↓

Fill

studentFullName

durationF

formationDate

certificateId

instructorName

academyName

↓

Flatten the form

↓

Save the PDF

↓

Create Blob

↓

Automatically download

==========================================================
DOWNLOAD
==========================================================

Downloaded filename format:

certificate-{studentFullName}.pdf

Example

certificate-Mohamed-El-Machhoune.pdf

==========================================================
ERROR HANDLING
==========================================================

If PDF cannot load

Show destructive toast.

If one form field does not exist

Throw a descriptive error showing which field is missing.

If generation fails

Show destructive toast.

If download fails

Show descriptive error.

==========================================================
SUCCESS
==========================================================

After successful generation

Show toast

"Certificate generated successfully."

==========================================================
TYPE SAFETY
==========================================================

Create proper TypeScript types.

Avoid "any".

Use interfaces.

Strong typing everywhere.

==========================================================
CODE QUALITY
==========================================================

Write production-ready code.

No duplicated logic.

Small reusable functions.

Clean architecture.

Well-commented where necessary.

Readable code.

==========================================================
PERFORMANCE
==========================================================

Lazy-load pdf-lib.

Do not load it on page load.

Generate only after button click.

Avoid unnecessary re-renders.

==========================================================
RESPONSIVE
==========================================================

Desktop

Tablet

Mobile

The dialog must be fully responsive.

==========================================================
ACCESSIBILITY
==========================================================

Keyboard navigation.

Focus states.

ARIA labels where appropriate.

Accessible buttons.

Accessible dialog.

==========================================================
OUTPUT
==========================================================

Generate every required file.

Generate every component.

Generate every hook.

Generate every utility.

Generate every TypeScript interface.

Generate all imports.

Generate the complete production-ready implementation.

Do NOT use placeholders.

Do NOT use pseudocode.

Everything should work immediately after copying into the project.

The final implementation must preserve the exact Adobe Illustrator certificate design while dynamically filling only these existing PDF form fields:

- studentFullName
- durationF
- formationDate
- certificateId
- instructorName
- academyName

No HTML certificate rendering.
No coordinate-based text drawing.
Only fill the existing PDF form fields, flatten the PDF, and download the finished certificate.
