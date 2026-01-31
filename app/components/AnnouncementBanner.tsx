import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

const URL = 'https://zed.dev/theme-builder?ref=zed-themes.com';

export function AnnouncementBanner() {
  return (
    <div className="fixed top-0 w-full bg-zed-600 text-white py-2 px-4 text-center text-sm z-30">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span>Zed now has an official Theme Builder!</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="xs"
              variant="ghost"
              className="text-white hover:text-white hover:bg-zed-700 underline underline-offset-2"
            >
              Learn more
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Official Zed Theme Builder</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <p>
                Zed has released an official Theme Builder that offers more features and is actively maintained by the
                Zed team.
              </p>
              <p>We recommend migrating your themes to the official builder. You can do this by:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Download your themes from Zed Themes</li>
                <li>
                  Import them into the{' '}
                  <a
                    href={URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zed-600 dark:text-zed-400 hover:underline"
                  >
                    official Zed Theme Builder
                  </a>
                </li>
              </ol>
              <p className="text-sm text-muted-foreground">
                Zed Themes will remain active but is no longer being actively developed.
              </p>
              <Button asChild className="mt-2 bg-zed-600 hover:bg-zed-700">
                <a href={URL} target="_blank" rel="noopener noreferrer">
                  Go to Zed Theme Builder
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Button asChild size="xs" className="bg-white text-zed-700 hover:bg-zed-100">
          <a href={URL} target="_blank" rel="noopener noreferrer">
            Try it now
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}
