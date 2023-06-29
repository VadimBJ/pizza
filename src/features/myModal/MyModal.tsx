import React, { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MyModal.module.css';

const modalRoot = document.getElementById('modal-root');

type MyProps = {
  setActive: (args:boolean) => void;
  component: JSX.Element;
};

export default function MyModal({ setActive, component: Component }:MyProps):JSX.Element {
  function unMount(event:MouseEvent<HTMLDivElement>):void {
    if (event.currentTarget === event.target) {
      setActive(false);
    }
  }
  function keyDown(event:KeyboardEvent):void {
    if (event.code === 'Escape') {
      setActive(false);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => { window.removeEventListener('keydown', keyDown); };
  });
  return createPortal(
    <div className={styles.modal} role="button" tabIndex={0} onClick={unMount}>
      <div className={styles.modalContent} role="button" tabIndex={0}>
        {Component}
      </div>
    </div>, modalRoot as HTMLElement
  );
}
