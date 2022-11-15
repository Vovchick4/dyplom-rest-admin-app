import { useState } from 'react';

import styles from './Layout.module.css';
import { Navbar, Sidebar, Container } from '../';

export default function Layout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function openSidebar() {
    setSidebarVisible(true);
  }

  function closeSidebar() {
    setSidebarVisible(false);
  }

  return (
    <>
      <Sidebar open={sidebarVisible} onClose={closeSidebar} />
      <Navbar onOpenSidebar={openSidebar} />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.scrollable}>
            <Container>{children}</Container>
          </div>
        </div>
      </div>
    </>
  );
}
