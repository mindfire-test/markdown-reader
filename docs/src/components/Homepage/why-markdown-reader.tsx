import React from 'react';
import { Keyboard, Lock, Rocket } from 'lucide-react';

export function WhyMarkdownReaderSection() {
  return (
    <section
      aria-labelledby="why-markdown-reader-title"
      className="bg-primary/5 relative w-full px-6 py-20 border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary mb-4">
            Why Markdown Reader ?
          </div>

          <h2
            id="why-markdown-reader-title"
            className="font-bold tracking-tight text-3xl sm:text-4xl lg:text-5xl text-foreground text-center leading-[1.15]"
          >
            Built for <span className="text-primary">reading</span>, not editing
          </h2>

          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto mt-4">
            VS Code is an editor. GitHub is a website. Markdown Reader is a dedicated desktop viewer
            that opens .md files like finished documents.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-3 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Rocket className="w-4 h-4 text-primary" />}
            title="Fast by default"
            desc="Designed around quick launch, quick file open, and smooth reading for everyday Markdown documents, READMEs, and notes."
          />

          <FeatureCard
            icon={<Lock className="w-4 h-4 text-primary" />}
            title="Private and offline"
            desc="Your files stay local. No accounts, no cloud sync, no telemetry, and no network calls during normal reading."
          />

          <FeatureCard
            icon={<Keyboard className="w-4 h-4 text-primary" />}
            title="Keyboard friendly"
            desc="Open files, switch themes, search, zoom, toggle panels, and move through tabs with native shortcuts."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-border/60 bg-background/50 rounded-xl p-6 shadow-sm flex flex-col items-start text-left hover:bg-muted/20 transition-colors duration-200">
      <div className="p-2 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed m-0">{desc}</p>
    </div>
  );
}
