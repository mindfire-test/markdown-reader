import Link from '@docusaurus/Link';

export function CTASection() {
  return (
    <section className="w-full pt-16 pb-20 px-6 relative flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-6 md:px-12 py-12 md:py-16 rounded-2xl border border-border/60 bg-background/50 backdrop-blur-md shadow-sm">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-6 text-center">
          
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Ready to make Markdown feel <span className="text-primary">native</span>?
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Join thousands of readers who are browsing faster, organizing smarter, and creating beautiful reading experiences with Markdown Reader.
            </p>
          </div>

          <div className="mt-2 w-full flex justify-center">
            <Link 
              to="https://github.com/mindfiredigital/markdown-reader" 
              className="no-underline inline-block"
            >
              <button className="px-8 py-3 rounded-xl text-base font-semibold text-white bg-primary hover:bg-primary/90 shadow-sm transition-colors cursor-pointer border-0">
                Start Building
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
