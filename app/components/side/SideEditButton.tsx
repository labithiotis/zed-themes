import { useNavigate, useRevalidator } from '@remix-run/react';
import { useCallback } from 'react';
import { RxPencil1 } from 'react-icons/rx';
import { Button } from '../ui/button';

export function SideEditButton() {
  const navigate = useNavigate();

  const edit = useCallback(() => {
    navigate('/themes/edit');
  }, [navigate]);

  return (
    <Button size="sm" variant="outline" onClick={edit} className="flex-1 flex gap-1 items-center">
      <RxPencil1 />
      <span>Edit this theme</span>
    </Button>
  );
}
