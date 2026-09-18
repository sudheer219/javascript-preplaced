
// Abstract Class (Blueprint)
abstract class Animal {
    // Abstract method (does not have a body)
    public abstract void make_sound();

    // Regular method
    public void sleep() {
        System.out.println("Zzz");
    }
}

// Subclass (provides the implementation)
class Dog extends Animal {
    public void make_sound() {
        System.out.println("Bark Bark");
    }
}