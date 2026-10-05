import paneerTikka from "@/assets/paneer-tikka.jpg";
import malaiKebab from "@/assets/malai-kebab.jpg";
import lotusStem from "@/assets/lotus-stem.jpg";
import butterChicken from "@/assets/butter-chicken.jpg";
import dalMakhani from "@/assets/dal-makhani.jpg";
import roganJosh from "@/assets/rogan-josh.jpg";
import risotto from "@/assets/risotto.jpg";
import gulabCheesecake from "@/assets/gulab-cheesecake.jpg";
import chocolateFondant from "@/assets/chocolate-fondant.jpg";
import kulfi from "@/assets/kulfi.jpg";
import masalaChai from "@/assets/masala-chai.jpg";
import kesarShake from "@/assets/kesar-shake.jpg";
import coldBrew from "@/assets/cold-brew.jpg";

export type Category = "Starters" | "Mains" | "Desserts" | "Beverages";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  veg: boolean;
  image: string;
  spicy?: boolean;
  bestseller?: boolean;
}

export const CATEGORIES: Category[] = ["Starters", "Mains", "Desserts", "Beverages"];

export const RESTAURANT_NAME = "The Saffron House";
export const WHATSAPP_NUMBER = "917588926483";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "paneer-tikka",
    name: "Tandoori Paneer Tikka",
    description: "Char-grilled cottage cheese, smoked in the tandoor with mint chutney",
    price: 345,
    category: "Starters",
    veg: true,
    image: paneerTikka,
    bestseller: true,
  },
  {
    id: "malai-kebab",
    name: "Murgh Malai Kebab",
    description: "Velvety chicken skewers, cream cheese & saffron marinade",
    price: 425,
    category: "Starters",
    veg: false,
    image: malaiKebab,
  },
  {
    id: "lotus-stem",
    name: "Honey Chilli Lotus Stem",
    description: "Crispy lotus stem tossed in honey-chilli glaze & toasted sesame",
    price: 365,
    category: "Starters",
    veg: true,
    image: lotusStem,
    spicy: true,
  },
  {
    id: "butter-chicken",
    name: "Old Delhi Butter Chicken",
    description: "Slow-simmered tomato gravy, tandoori chicken, hand-churned butter",
    price: 545,
    category: "Mains",
    veg: false,
    image: butterChicken,
    bestseller: true,
  },
  {
    id: "dal-makhani",
    name: "Dal Makhani",
    description: "Black lentils simmered overnight, finished with cream & ghee",
    price: 395,
    category: "Mains",
    veg: true,
    image: dalMakhani,
    bestseller: true,
  },
  {
    id: "rogan-josh",
    name: "Kashmiri Rogan Josh",
    description: "Tender lamb, Kashmiri chillies, whole spices, saffron rice",
    price: 645,
    category: "Mains",
    veg: false,
    image: roganJosh,
    spicy: true,
  },
  {
    id: "risotto",
    name: "Truffle Mushroom Risotto",
    description: "Arborio rice, wild mushrooms, truffle oil, aged parmesan",
    price: 595,
    category: "Mains",
    veg: true,
    image: risotto,
  },
  {
    id: "gulab-cheesecake",
    name: "Gulab Jamun Cheesecake",
    description: "Baked cheesecake with gulab jamun heart, rose petals & gold leaf",
    price: 325,
    category: "Desserts",
    veg: true,
    image: gulabCheesecake,
    bestseller: true,
  },
  {
    id: "chocolate-fondant",
    name: "Belgian Chocolate Fondant",
    description: "Molten dark chocolate centre, Madagascar vanilla ice cream",
    price: 345,
    category: "Desserts",
    veg: true,
    image: chocolateFondant,
  },
  {
    id: "kulfi",
    name: "Kesar Pista Kulfi",
    description: "Traditional slow-reduced kulfi, saffron & roasted pistachio",
    price: 245,
    category: "Desserts",
    veg: true,
    image: kulfi,
  },
  {
    id: "masala-chai",
    name: "House Masala Chai",
    description: "Assam leaves brewed with crushed spices, served in copper",
    price: 145,
    category: "Beverages",
    veg: true,
    image: masalaChai,
  },
  {
    id: "kesar-shake",
    name: "Kesar Badam Shake",
    description: "Saffron & almond milkshake, pistachio crumble",
    price: 225,
    category: "Beverages",
    veg: true,
    image: kesarShake,
  },
  {
    id: "cold-brew",
    name: "Signature Cold Brew",
    description: "18-hour steeped single-origin cold brew with cream swirl",
    price: 265,
    category: "Beverages",
    veg: true,
    image: coldBrew,
  },
];

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN");
