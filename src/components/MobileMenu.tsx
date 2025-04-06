
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="block">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-2xl font-bold gradient-text">CV Master</span>
          </div>
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors py-2 px-4">About</a>
          <a href="#features" className="text-muted-foreground hover:text-primary transition-colors py-2 px-4">Features</a>
          <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors py-2 px-4">How it Works</a>
          <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors py-2 px-4">Pricing</a>
          <div className="mt-4 space-y-2 px-4">
            <Button variant="outline" className="w-full justify-center" asChild>
              <a href="/auth/login">Login</a>
            </Button>
            <Button className="w-full justify-center" asChild>
              <a href="/auth/signup">Signup</a>
            </Button>
          </div>
          <div className="mt-4 px-4">
            <ThemeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
