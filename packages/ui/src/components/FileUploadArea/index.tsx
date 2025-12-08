import { WithClassName } from '@draw-house/common/dist/utils';
import { useEffect, useRef, useState } from 'react';
import { isNull, isUndefined, Union } from '@arthurka/ts-utils';
import assert from 'assert';
import { VisuallyHiddenInput } from '../../utils/styles';
import { DropFileIcon } from '../Icons';
import { Label, PrimaryText, SecondaryText, TextContainer } from './styles';

const formatAcceptExtensions = (accept: string): string => (
  [...new Set(
    accept
      .replace('jpeg', 'jpg')
      .split(',')
      .map(e => e.trim().replace(/^\./, '').toUpperCase()),
  )].join(' ')
);

const getFileExtension = (filename: string): string | null => {
  if(!filename.includes('.')) {
    return null;
  }

  const ext = filename.split('.').pop();
  if(isUndefined(ext) || ext.length === 0) {
    return null;
  }

  return `.${ext}`.toLowerCase();
};

const isExtensionAllowed = ({ file, accept }: { file: File; accept: string }): boolean => {
  const ext = getFileExtension(file.name);

  return !isNull(ext) && accept.split(',').includes(ext);
};

export type FileUploadAreaProps = Union<
  & {
    primaryText: string;
    supportedFormatsText: string;
    accept: string;
  }
  & (
    | {
      onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    }
    | {
      onFileSelect: (file: File) => void;
      onFileReject?: (param: { file: File; showDefaultRejectionEffect: () => void }) => void;
    }
  )
>;

export const FileUploadArea = ({
  className,
  primaryText,
  supportedFormatsText,
  accept,
  onClick,
  onFileSelect,
  onFileReject,
}: FileUploadAreaProps & WithClassName) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [reject, setReject] = useState(false);
  const isRejectResetScheduled = useRef(false);
  const dragOverTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if(reject === false || isRejectResetScheduled.current === true) {
      return;
    }

    const id = window.setTimeout(() => {
      setReject(false);
      isRejectResetScheduled.current = false;
    }, 500);

    isRejectResetScheduled.current = true;

    return () => {
      window.clearTimeout(id);
    };
  }, [reject]);

  const handleReject = (file: File) => {
    if(isUndefined(onFileReject)) {
      setReject(true);
    } else {
      onFileReject({
        file,
        showDefaultRejectionEffect: () => setReject(true),
      });
    }
  };

  const handleFile = (file: File) => {
    const allowed = isExtensionAllowed({ file, accept });
    if(allowed === false) {
      handleReject(file);
      return;
    }

    assert(!isUndefined(onFileSelect), 'Should not happen. |lm4nk6|');
    onFileSelect(file);
  };

  return (
    <Label
      className={className}
      reject={reject}
      isDraggingOver={isDraggingOver}
      onDragOver={e => {
        e.preventDefault();

        if(isDraggingOver === false) {
          setIsDraggingOver(true);
        }

        if(!isNull(dragOverTimeoutRef.current)) {
          window.clearTimeout(dragOverTimeoutRef.current);
          dragOverTimeoutRef.current = null;
        }
        dragOverTimeoutRef.current = window.setTimeout(() => {
          setIsDraggingOver(false);
        }, 100);
      }}
      onDrop={e => {
        e.preventDefault();

        const file = e.dataTransfer.items.length > 0
          ? e.dataTransfer.items[0]?.getAsFile()
          : e.dataTransfer.files[0];

        if(file instanceof File) {
          handleFile(file);
        }
      }}
    >
      <DropFileIcon />

      <TextContainer>
        <PrimaryText>{primaryText}</PrimaryText>
        <SecondaryText>{`${supportedFormatsText} ${formatAcceptExtensions(accept)}`}</SecondaryText>
      </TextContainer>

      <VisuallyHiddenInput
        type='file'
        accept={accept}
        {
          ...!isUndefined(onClick)
            ? { onClick } as const
            : {
              onChange: e => {
                const file = e.target.files?.[0];
                e.target.value = '';

                if(file instanceof File) {
                  handleFile(file);
                }
              },
            } as const
        }
      />
    </Label>
  );
};
