/*
 1) Moduly - 
 slouží k tomu, že si voláme z jedné stránky na druhou, kdy používáme import a export

 2) Klasy
- classes allow us to use object-oriented programming

class Robot {} = tohle je klasa

const robot = new Robot(); = tohle je instance klasy (robot)


- funkce uvnitř klasy jsou nazývány metody
class Robot {

  constructor(){
    console.log("Thank you creator")
  }  

  sayHi() {
    console.log("Hello!"); = tohle je metoda
  }

}

- každá instance má přístup k metodě
- construktor je speciální metoda, která se spouští automaticky při každé vytvořené instanci


- Kontext zname použití this.name = name 
- znamená to, že můžeme volat z konstruktoru danou informaci a můžeme využít v metodě 

 constructor(name) {
    this.name = name;
    console.log(`I am ${this.name}. Thank you creator`);
  }

  sayHi() {
    console.log(`Hello my name iss ${this.name}`);
  }
}

3) Inheritence
- rozšiřuje např. dům o další patro 
- class FlyingRobot extends Robot

class FlyingRobot extends Robot {
  takeOff() {
    console.log(`Have a good flight ${this.name}`);
  }

  land() {
    console.log(`Welcome back ${this.name}`);
  }
}

const wallE = new Robot("Wall-E", 0);
const ultron = new FlyingRobot("Ultron", 2);
const astroBoy = new FlyingRobot("Astro Boy", 2);

ultron.takeOff();


- pokud nezměníme v konstruktoru "new FlyingRobot" nebudeme mít přístup k zavolání wallE takeOff nebo land
- pokud voláme stejnou metodu jak v Robovi a pak ve Flying Robotovi sayHi(), tak se metoda přepíše ve FlyingRobotovi
- volání z rodičovského konstruktoru je za pomocí super()
- jaký je rozdíl mezi super.sayHi() a this.sayHi()?? Rozdíl je v tom, že super volá z rodičovského konstruktoru a this je z momentálního konstruktoru






ROZDĚLENÍ AKTUALNÍHO KÓDU

- znamená, že chci sledovat(poslouchat) událost s názvem resize
this.sizes.on("resize", () => {
      this.resize();
    });

- uděláme funkci, že kdykoliv, kdy změníme velikost, zaktivuje se trigger
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
- pokud bychom nevložili trigger, nebyl by o tom nikdo informován (ostatní komponenty)
      this.trigger("resize");    

- je důležité používat EventEmitter, aby classy zaktivovaly eventy      




Globalní proměnná (abychom měli přístup k metodám)
1)
Camera.js
this.experience = window.experience;
2)
Experience.js 
this.camera = new Camera(this)
Camera.js
constructor(experience){
    this.experience = experience
}
3) SINGLETON
Experience.js
let instance = null
if (instance) {
      return instance;
    }
    instance = this;
Camera.js
import Experience from "./Experience"
constructor() {
    this.experience = new Experience();
  }



*/
