import React from 'react';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './styles.module.css';
import {
  ArrowRight,
  Download,
  GitBranchIcon,
} from 'lucide-react';
import { downloads } from '@site/src/utils/constants/download-constants';

export function HeroSection() {
  return (
    <section aria-label="Hero" className="relative overflow-hidden hero-clean-bg w-full">
      <header className={clsx(styles.heroBanner, 'flex items-center justify-center py-16 sm:py-20')}>
        <div className={clsx(styles.heroContent, 'w-full relative z-10')}>
          <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
            <motion.div
              className="w-full flex flex-col items-center justify-center text-center mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h1
                className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-center"
                style={{ lineHeight: 1.1 }}
              >
                Read Markdown, <br className="hidden sm:inline" />
                <span>like opening a </span>
                <span className="text-primary font-semibold">document.</span>
              </h1>

              <div className="mt-6 w-full max-w-2xl mx-auto flex justify-center">
                <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed tracking-normal">
                  A native desktop reader for <span className="text-foreground font-semibold">.md files</span> - built for clean reading, table of contents, search, themes, Mermaid, KaTeX, export, and offline-first privacy.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-3.5 mt-2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/docs/installation" className="no-underline">
                <button className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium h-11 px-6 text-sm rounded-xl shadow-sm cursor-pointer transition-colors duration-200 border-0">
                  Get Started <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={2.5} />
                </button>
              </Link>

              <a
                href="/docs/introduction"
                className="no-underline"
                target="_blank"
                rel="noreferrer"
              >
                <button className="inline-flex items-center justify-center bg-background/50 hover:bg-background/80 text-foreground border border-border/80 font-medium h-11 px-6 text-sm rounded-xl shadow-sm cursor-pointer transition-colors duration-200">
                  <GitBranchIcon className="mr-1.5 h-4 w-4" strokeWidth={2.5} />
                  GitHub
                </button>
              </a>
            </motion.div>
            <motion.div
              className="mt-16 w-full max-w-3xl mx-auto border border-border/60 bg-background/40 backdrop-blur-md rounded-xl p-5 shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <div className="grid gap-0 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
                {downloads.map((item, idx) => (
                  <div key={item.name} className={clsx("flex flex-col items-center p-4 transition-colors duration-200 hover:bg-muted/20", idx === 0 && "rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl", idx === downloads.length - 1 && "rounded-b-xl sm:rounded-bl-none sm:rounded-r-xl")}>
                    <img
                      src={item.icon}
                      alt={`${item.name} icon`}
                      className="h-7 w-7 object-contain opacity-90 brightness-100"
                    />
                    <h2 className="text-sm font-semibold text-foreground mt-3 mb-0.5">
                      {item.name}
                    </h2>
                    <span className="text-xs text-muted-foreground font-mono mb-4">
                      {item.format}
                    </span>
                    <a
                      href={item.href}
                      download
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline no-underline transition-colors group"
                    >
                      <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </header>
    </section>
  );
}


