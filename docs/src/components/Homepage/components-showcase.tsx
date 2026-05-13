import React from 'react';
import { features } from '@site/src/utils/constants/feature-contants';

export default function FeaturedComponents() {
  return (
    <section className="w-full px-5 py-20 relative">
      <div className="max-w-6xl mx-auto">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.08] text-foreground">
            Everything a dedicated Markdown reader needs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Built for people who read READMEs, specs, notes, docs, changelogs, and long Markdown files every day.
          </p>
        </header>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="feature-card-clean">
                <div className="feature-icon-clean">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mt-5 mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed m-0">{feature.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
