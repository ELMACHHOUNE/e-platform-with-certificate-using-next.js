"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

export function CertificateLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Award className="size-8 text-primary" />
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-foreground">
          Generating your certificate
        </p>
        <p className="text-xs text-muted-foreground">
          Please wait while we prepare your document
        </p>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="size-2 rounded-full bg-primary"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
