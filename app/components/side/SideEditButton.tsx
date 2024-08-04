import { useNavigate } from '@remix-run/react';
import { RxPencil1 } from 'react-icons/rx';
import { Button } from '../ui/button';

export function SideEditButton() {
  const navigate = useNavigate();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => navigate('/themes/edit')}
      className="flex-1 flex gap-1 items-center"
    >
      <RxPencil1 />
      <span>Edit this theme</span>
    </Button>
  );
}
