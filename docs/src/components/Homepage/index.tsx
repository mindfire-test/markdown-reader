import React from 'react';
import styles from './styles.module.css';
import ComponentShowcase from './components-showcase';

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles.componentShowcase}>
      <div className="">
        <div className="block md:hidden p-4">
          <ComponentShowcase />
        </div>
      </div>
    </section>
  );
}