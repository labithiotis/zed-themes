import { useCallback, useEffect, useState } from 'react';
import { IoIosRedo, IoIosUndo } from 'react-icons/io';
import { useThemeStore } from '~/providers/theme';
import { Button } from '../ui/button';

export function SideUndoRedoButtons() {
  const temporal = useThemeStore.temporal.getState();
  const [show, setShow] = useState(true);
  const canUndo = !!(temporal.pastStates.length > 0);
  const canRedo = !!(temporal.futureStates.length > 0);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setShow(hasTouch && window.innerWidth <= 1024);
  }, []);

  const handleUndo = useCallback(() => canUndo && temporal.undo(), [canUndo, temporal.undo]);
  const handleRedo = useCallback(() => canRedo && temporal.redo(), [canRedo, temporal.redo]);

  if (!show) return null;

  return (
    <div className="flex justify-stretch items-center p-2 gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={handleUndo}
        disabled={!canUndo}
        className="flex-1 flex gap-1 items-center"
        title="Undo"
      >
        <IoIosUndo />
        <span>Undo</span>
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleRedo}
        disabled={!canRedo}
        className="flex-1 flex gap-1 items-center"
        title="Redo"
      >
        <span>Redo</span>
        <IoIosRedo />
      </Button>
    </div>
  );
}
