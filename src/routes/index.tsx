import { createFileRoute } from '@tanstack/react-router'; 
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({ component: App })

function App() {
 

  return (
   <div>
    <Button onClick={() => toast.success("hello salman!")}>
      Hello
    </Button>
   </div>
  )
}
