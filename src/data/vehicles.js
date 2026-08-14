import dzireImg from '../assets/vehicles/dzire-tour-s.jpg';
import ertigaImg from '../assets/vehicles/maruti-ertiga.jpg';
import innovaImg from '../assets/vehicles/toyota-innova.jpg';
import travellerImg from '../assets/vehicles/force-traveller.jpg';
import crystaImg from '../assets/vehicles/innova-crysta.jpg';
import taveraImg from '../assets/vehicles/chevrolet-tavera.jpg';
import ciazImg from '../assets/vehicles/maruti-ciaz.jpg';

export const VEHICLES = [
  {
    id: "dzire-tour-s",
    name: "Maruti Suzuki Dzire Tour S",
    category: "Sedan",
    tagline: "Comfortable sedan for small families, couples, and quick local travel.",
    seating: "4+1 Passengers",
    luggage: "2-3 Bags",
    acType: "Air Conditioned",
    fuelType: "Diesel / Petrol / CNG",
    priceStarting: "₹11–₹12 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Popular Small Family Choice",
    image: dzireImg,
    features: [
      "Plush comfortable seating & legroom",
      "Chilling Air Conditioner",
      "Sanitized clean vehicle",
      "Experienced Shirdi chauffeur"
    ]
  },
  {
    id: "maruti-ertiga",
    name: "Maruti Suzuki Ertiga",
    category: "MUV",
    tagline: "Comfortable family car suitable for family trips, temple darshan & outstation.",
    seating: "6+1 Passengers",
    luggage: "3-4 Bags",
    acType: "Dual AC",
    fuelType: "Diesel / CNG",
    priceStarting: "₹14–₹15 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Best Value Family Choice",
    image: ertigaImg,
    features: [
      "Foldable rear seating for luggage",
      "Dual blower rear AC vents",
      "Smooth highway ride comfort",
      "Verified pilgrimage tour driver"
    ]
  },
  {
    id: "toyota-innova",
    name: "Toyota Innova",
    category: "SUV",
    tagline: "The benchmark for highway travel comfort, long tours and family travel.",
    seating: "7+1 Passengers",
    luggage: "4-5 Bags",
    acType: "Dual Zone AC",
    fuelType: "Diesel",
    priceStarting: "₹17–₹18 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Maximum Highway Comfort",
    image: innovaImg,
    features: [
      "Captain seat configuration option",
      "Unmatched suspension for smooth travel",
      "Spacious legroom & boot capacity",
      "Highway toll auto-pass ready"
    ]
  },
  {
    id: "innova-crysta",
    name: "Toyota Innova Crysta",
    category: "SUV",
    tagline: "Premium luxury SUV for VIP travel, corporate clients & long distance tours.",
    seating: "7+1 Passengers",
    luggage: "5+ Bags",
    acType: "Automatic Climate Control",
    fuelType: "Diesel",
    priceStarting: "₹19–₹21 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Luxury & VIP Standard",
    image: crystaImg,
    features: [
      "Ultra-premium leather interior",
      "Ambient lighting & multi-zone AC",
      "Superior highway sound insulation",
      "Professional uniform chauffeur"
    ]
  },
  {
    id: "chevrolet-tavera",
    name: "Chevrolet Tavera",
    category: "MUV",
    tagline: "Rugged and spacious MUV ideal for family pilgrimages and economical group tours.",
    seating: "7–9 Passengers",
    luggage: "4-5 Bags",
    acType: "Dual AC",
    fuelType: "Diesel",
    priceStarting: "₹14–₹16 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Economical Group MUV",
    image: taveraImg,
    features: [
      "Generous seating for up to 9 passengers",
      "Powerful dual cooling AC",
      "High ground clearance for all terrains",
      "Reliable and economical travel"
    ]
  },
  {
    id: "maruti-ciaz",
    name: "Maruti Suzuki Ciaz",
    category: "Sedan",
    tagline: "Executive premium sedan with class-leading rear legroom and smooth highway ride.",
    seating: "4+1 Passengers",
    luggage: "3 Bags",
    acType: "Automatic Climate Control",
    fuelType: "Petrol / Diesel",
    priceStarting: "₹13–₹14 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "₹35,000 / month",
    badge: "Executive Class Sedan",
    image: ciazImg,
    features: [
      "Best-in-class executive rear legroom",
      "Automatic climate control AC",
      "Plush fabric & quiet cabin",
      "Experienced polite driver"
    ]
  },
  {
    id: "force-traveller",
    name: "Force Traveller",
    category: "Tempo Traveller",
    tagline: "Spacious vehicle ideal for group pilgrimages, wedding parties & outstation tours.",
    seating: "12–17 / 20+ Passengers",
    luggage: "10+ Heavy Bags",
    acType: "Powerful Roof AC",
    fuelType: "Diesel",
    priceStarting: "₹22–₹24 / km",
    rateRange: "₹11–₹25 / km",
    monthlyRental: "Contact for Tour Packages",
    badge: "Top Choice for Group Pilgrims",
    image: travellerImg,
    features: [
      "Push-back reclining seats",
      "High roof with standing clearance",
      "Dedicated luggage carrier rack",
      "LED lighting & music system"
    ]
  }
];
