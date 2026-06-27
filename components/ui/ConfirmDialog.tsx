'use client';

import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const variantStyles = {
  danger: {
    title: 'text-red-600',
    icon: 'bg-red-100 text-red-600',
    button: 'bg-red-600 hover:bg-red-700',
  },
  warning: {
    title: 'text-amber-600',
    icon: 'bg-amber-100 text-amber-600',
    button: 'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    title: 'text-emerald-600',
    icon: 'bg-emerald-100 text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700',
  },
};

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmDialogProps) {
  const styles = variantStyles[variant];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onCancel}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}>
                    {variant === 'danger' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {variant === 'warning' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {variant === 'info' && (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <Dialog.Title as="h3" className={`text-lg font-semibold ${styles.title}`}>
                      {title}
                    </Dialog.Title>
                    <p className="mt-2 text-sm text-gray-500">{message}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    onClick={onCancel}
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${styles.button}`}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export function useConfirm() {
  const [config, setConfig] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    variant: 'danger',
    onConfirm: () => {},
  });

  const confirm = (params: {
    title: string;
    message: string;
    variant?: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }) => {
    setConfig({ open: true, ...params });
  };

  const handleCancel = () => {
    setConfig(prev => ({ ...prev, open: false }));
  };

  const handleConfirm = () => {
    config.onConfirm();
    setConfig(prev => ({ ...prev, open: false }));
  };

  return { config, confirm, ConfirmDialog: () => (
    <ConfirmDialog
      isOpen={config.open}
      title={config.title}
      message={config.message}
      variant={config.variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  )};
}