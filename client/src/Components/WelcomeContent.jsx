import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";    
import location from "../Images/location.png";
import Loading from "./Loading";
export default function WelcomeContent() {
  const password = React.useRef();
  const cPassword = React.useRef();
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [cPasswordClass, setCPasswordClass] = React.useState("form-control");
  const [isCPasswordDirty, setIsCPasswordDirty] = React.useState(false);

  React.useEffect(() => {
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  }, [isCPasswordDirty]);

  const checkPasswords = (e) => {
    setIsCPasswordDirty(true);
    if (isCPasswordDirty) {
      if (password.current.value === cPassword.current.value) {
        setShowErrorMessage(false);
        setCPasswordClass("form-control is-valid");
      } else {
        setShowErrorMessage(true);
        setCPasswordClass("form-control is-invalid");
      }
    }
  };
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    district: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

const navigate=useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.current.value != cPassword.current.value) {
    alert("Passwords do not match");}
    else if(data.name=="" || data.email=="" || data.password=="" || data.age=="" || data.phone=="" || data.district==""){
      alert("Please fill all the fields");
    }
    else if(password.current.value.length<6){
      alert("password should be minimum 6 characters")
    }
    else if(data.age<18){
      alert("Age should be greater than 18")
    }
    else{
      data.district = data.district[0].toUpperCase() + data.district.slice(1);
      console.log(data)
      setLoading(true);
   try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        data
      );
      setLoading(false);
      alert("User created successfully")
      console.log(response)
       navigate("/userlogin", {
         state: {
           token: response.data.token,
         },
         replace: true,
       });
    } catch (error) {
      console.log(error);
      alert("User already exists");
    }
  
} 
  }
  const districts = [
    "Adilabad",
    "Agar Malwa",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Airport Quarantine",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Alappuzha",
    "Aligarh",
    "Alipurduar",
    "Alirajpur",
    "Almora",
    "Alwar",
    "Ambala",
    "Ambedkar Nagar",
    "Amethi",
    "Amravati",
    "Amreli",
    "Amritsar",
    "Amroha",
    "Anand",
    "Anantapur",
    "Anantnag",
    "Angul",
    "Anjaw",
    "Anuppur",
    "Araria",
    "Aravalli",
    "Ariyalur",
    "Arwal",
    "Ashoknagar",
    "Auraiya",
    "Aurangabad",
    "Ayodhya",
    "Azamgarh",
    "BSF Camp",
    "Bagalkote",
    "Bageshwar",
    "Baghpat",
    "Bahraich",
    "Baksa",
    "Balaghat",
    "Balangir",
    "Balasore",
    "Ballari",
    "Ballia",
    "Balod",
    "Baloda Bazar",
    "Balrampur",
    "Bametara",
    "Banaskantha",
    "Banda",
    "Bandipora",
    "Banka",
    "Bankura",
    "Banswara",
    "Barabanki",
    "Baramulla",
    "Baran",
    "Bareilly",
    "Bargarh",
    "Barmer",
    "Barnala",
    "Barpeta",
    "Barwani",
    "Bastar",
    "Basti",
    "Bathinda",
    "Beed",
    "Begusarai",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Betul",
    "Bhadohi",
    "Bhadradri Kothagudem",
    "Bhadrak",
    "Bhagalpur",
    "Bhandara",
    "Bharatpur",
    "Bharuch",
    "Bhavnagar",
    "Bhilwara",
    "Bhind",
    "Bhiwani",
    "Bhojpur",
    "Bhopal",
    "Bidar",
    "Bijapur",
    "Bijnor",
    "Bikaner",
    "Bilaspur",
    "Birbhum",
    "Bishnupur",
    "Biswanath",
    "Bokaro",
    "Bongaigaon",
    "Botad",
    "Boudh",
    "Budaun",
    "Budgam",
    "Bulandshahr",
    "Buldhana",
    "Bundi",
    "Burhanpur",
    "Buxar",
    "CAPF Personnel",
    "Cachar",
    "Central Delhi",
    "Chamarajanagara",
    "Chamba",
    "Chamoli",
    "Champawat",
    "Champhai",
    "Chandauli",
    "Chandel",
    "Chandigarh",
    "Chandrapur",
    "Changlang",
    "Charaideo",
    "Charkhi Dadri",
    "Chatra",
    "Chengalpattu",
    "Chennai",
    "Chhatarpur",
    "Chhindwara",
    "Chhota Udaipur",
    "Chikkaballapura",
    "Chikkamagaluru",
    "Chirang",
    "Chitradurga",
    "Chitrakoot",
    "Chittoor",
    "Chittorgarh",
    "Churachandpur",
    "Churu",
    "Coimbatore",
    "Cooch Behar",
    "Cuddalore",
    "Cuttack",
    "Dadra and Nagar Haveli",
    "Dahod",
    "Dakshin Bastar Dantewada",
    "Dakshin Dinajpur",
    "Dakshina Kannada",
    "Daman",
    "Damoh",
    "Dang",
    "Darbhanga",
    "Darjeeling",
    "Darrang",
    "Datia",
    "Dausa",
    "Davanagere",
    "Dehradun",
    "Deogarh",
    "Deoghar",
    "Deoria",
    "Devbhumi Dwarka",
    "Dewas",
    "Dhalai",
    "Dhamtari",
    "Dhanbad",
    "Dhar",
    "Dharmapuri",
    "Dharwad",
    "Dhemaji",
    "Dhenkanal",
    "Dholpur",
    "Dhubri",
    "Dhule",
    "Dibrugarh",
    "Dima Hasao",
    "Dimapur",
    "Dindigul",
    "Dindori",
    "Diu",
    "Doda",
    "Dumka",
    "Dungarpur",
    "Durg",
    "East Champaran",
    "East Delhi",
    "East Garo Hills",
    "East Godavari",
    "East Jaintia Hills",
    "East Kameng",
    "East Khasi Hills",
    "East Siang",
    "East Sikkim",
    "East Singhbhum",
    "Ernakulam",
    "Erode",
    "Etah",
    "Etawah",
    "Evacuees",
    "Faridabad",
    "Faridkot",
    "Farrukhabad",
    "Fatehabad",
    "Fatehgarh Sahib",
    "Fatehpur",
    "Fazilka",
    "Ferozepur",
    "Firozabad",
    "Foreign Evacuees",
    "Gadag",
    "Gadchiroli",
    "Gajapati",
    "Ganderbal",
    "Gandhinagar",
    "Ganganagar",
    "Ganjam",
    "Garhwa",
    "Gariaband",
    "Gaurela Pendra Marwahi",
    "Gautam Buddha Nagar",
    "Gaya",
    "Ghaziabad",
    "Ghazipur",
    "Gir Somnath",
    "Giridih",
    "Goalpara",
    "Godda",
    "Golaghat",
    "Gomati",
    "Gonda",
    "Gondia",
    "Gopalganj",
    "Gorakhpur",
    "Gumla",
    "Guna",
    "Guntur",
    "Gurdaspur",
    "Gurugram",
    "Gwalior",
    "Hailakandi",
    "Hamirpur",
    "Hanumangarh",
    "Hapur",
    "Harda",
    "Hardoi",
    "Haridwar",
    "Hassan",
    "Hathras",
    "Haveri",
    "Hazaribagh",
    "Hingoli",
    "Hisar",
    "Hnahthial",
    "Hojai",
    "Hooghly",
    "Hoshangabad",
    "Hoshiarpur",
    "Howrah",
    "Hyderabad",
    "Idukki",
    "Imphal East",
    "Imphal West",
    "Indore",
    "Italians",
    "Jabalpur",
    "Jagatsinghpur",
    "Jagtial",
    "Jaipur",
    "Jaisalmer",
    "Jajpur",
    "Jalandhar",
    "Jalaun",
    "Jalgaon",
    "Jalna",
    "Jalore",
    "Jalpaiguri",
    "Jammu",
    "Jamnagar",
    "Jamtara",
    "Jamui",
    "Jangaon",
    "Janjgir Champa",
    "Jashpur",
    "Jaunpur",
    "Jayashankar Bhupalapally",
    "Jehanabad",
    "Jhabua",
    "Jhajjar",
    "Jhalawar",
    "Jhansi",
    "Jhargram",
    "Jharsuguda",
    "Jhunjhunu",
    "Jind",
    "Jiribam",
    "Jodhpur",
    "Jogulamba Gadwal",
    "Jorhat",
    "Junagadh",
    "Kabeerdham",
    "Kaimur",
    "Kaithal",
    "Kakching",
    "Kalaburagi",
    "Kalahandi",
    "Kalimpong",
    "Kallakurichi",
    "Kamareddy",
    "Kamjong",
    "Kamle",
    "Kamrup",
    "Kamrup Metropolitan",
    "Kancheepuram",
    "Kandhamal",
    "Kangpokpi",
    "Kangra",
    "Kannauj",
    "Kannur",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kanyakumari",
    "Kapurthala",
    "Karaikal",
    "Karauli",
    "Karbi Anglong",
    "Kargil",
    "Karimganj",
    "Karimnagar",
    "Karnal",
    "Karur",
    "Kasaragod",
    "Kasganj",
    "Kathua",
    "Katihar",
    "Katni",
    "Kaushambi",
    "Kendrapara",
    "Kendujhar",
    "Khagaria",
    "Khammam",
    "Khandwa",
    "Khargone",
    "Khawzawl",
    "Kheda",
    "Khordha",
    "Khowai",
    "Khunti",
    "Kinnaur",
    "Kiphire",
    "Kishanganj",
    "Kishtwar",
    "Kodagu",
    "Koderma",
    "Kohima",
    "Kokrajhar",
    "Kolar",
    "Kolasib",
    "Kolhapur",
    "Kolkata",
    "Kollam",
    "Komaram Bheem",
    "Kondagaon",
    "Koppal",
    "Koraput",
    "Korba",
    "Koriya",
    "Kota",
    "Kottayam",
    "Kozhikode",
    "Kra Daadi",
    "Krishna",
    "Krishnagiri",
    "Kulgam",
    "Kullu",
    "Kupwara",
    "Kurnool",
    "Kurukshetra",
    "Kurung Kumey",
    "Kushinagar",
    "Kutch",
    "Lahaul and Spiti",
    "Lakhimpur",
    "Lakhimpur Kheri",
    "Lakhisarai",
    "Lakshadweep",
    "Lalitpur",
    "Latehar",
    "Latur",
    "Lawngtlai",
    "Leh",
    "Lepa Rada",
    "Lohardaga",
    "Lohit",
    "Longding",
    "Longleng",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Lucknow",
    "Ludhiana",
    "Lunglei",
    "Madhepura",
    "Madhubani",
    "Madurai",
    "Mahabubabad",
    "Mahabubnagar",
    "Maharajganj",
    "Mahasamund",
    "Mahe",
    "Mahendragarh",
    "Mahisagar",
    "Mahoba",
    "Mainpuri",
    "Majuli",
    "Malappuram",
    "Malda",
    "Malkangiri",
    "Mamit",
    "Mancherial",
    "Mandi",
    "Mandla",
    "Mandsaur",
    "Mandya",
    "Mansa",
    "Mathura",
    "Mau",
    "Mayiladuthurai",
    "Mayurbhanj",
    "Medak",
    "Medchal Malkajgiri",
    "Meerut",
    "Mehsana",
    "Mirpur",
    "Mirzapur",
    "Moga",
    "Mokokchung",
    "Mon",
    "Moradabad",
    "Morbi",
    "Morena",
    "Morigaon",
    "Mulugu",
    "Mumbai",
    "Mumbai Suburban",
    "Mungeli",
    "Munger",
    "Murshidabad",
    "Muzaffarabad",
    "Muzaffarnagar",
    "Muzaffarpur",
    "Mysuru",
    "Nabarangapur",
    "Nadia",
    "Nagaon",
    "Nagapattinam",
    "Nagarkurnool",
    "Nagaur",
    "Nagpur",
    "Nainital",
    "Nalanda",
    "Nalbari",
    "Nalgonda",
    "Namakkal",
    "Namsai",
    "Nanded",
    "Nandurbar",
    "Narayanpet",
    "Narayanpur",
    "Narmada",
    "Narsinghpur",
    "Nashik",
    "Navsari",
    "Nawada",
    "Nayagarh",
    "Neemuch",
    "New Delhi",
    "Nicobars",
    "Nilgiris",
    "Nirmal",
    "Niwari",
    "Nizamabad",
    "Noney",
    "North 24 Parganas",
    "North Delhi",
    "North East Delhi",
    "North Garo Hills",
    "North Goa",
    "North Sikkim",
    "North Tripura",
    "North West Delhi",
    "North and Middle Andaman",
    "Nuapada",
    "Nuh",
    "Osmanabad",
    "Pakke Kessang",
    "Pakur",
    "Palakkad",
    "Palamu",
    "Palghar",
    "Pali",
    "Palwal",
    "Panchkula",
    "Panchmahal",
    "Panipat",
    "Panna",
    "Papum Pare",
    "Parbhani",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Patan",
    "Pathanamthitta",
    "Pathankot",
    "Patiala",
    "Patna",
    "Pauri Garhwal",
    "Peddapalli",
    "Perambalur",
    "Peren",
    "Phek",
    "Pherzawl",
    "Pilibhit",
    "Pithoragarh",
    "Porbandar",
    "Prakasam",
    "Pratapgarh",
    "Prayagraj",
    "Puducherry",
    "Pudukkottai",
    "Pulwama",
    "Punch",
    "Pune",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Puri",
    "Purnia",
    "Purulia",
    "Rae Bareli",
    "Raichur",
    "Raigad",
    "Raigarh",
    "Railway Quarantine",
    "Raipur",
    "Raisen",
    "Rajanna Sircilla",
    "Rajgarh",
    "Rajkot",
    "Rajnandgaon",
    "Rajouri",
    "Rajsamand",
    "Ramanagara",
    "Ramanathapuram",
    "Ramban",
    "Ramgarh",
    "Rampur",
    "Ranchi",
    "Ranga Reddy",
    "Ranipet",
    "Ratlam",
    "Ratnagiri",
    "Rayagada",
    "Reasi",
    "Rewa",
    "Rewari",
    "Ribhoi",
    "Rohtak",
    "Rohtas",
    "Rudraprayag",
    "Rupnagar",
    "S.A.S. Nagar",
    "S.P.S. Nellore",
    "Sabarkantha",
    "Sagar",
    "Saharanpur",
    "Saharsa",
    "Sahibganj",
    "Saiha",
    "Saitual",
    "Salem",
    "Samastipur",
    "Samba",
    "Sambalpur",
    "Sambhal",
    "Sangareddy",
    "Sangli",
    "Sangrur",
    "Sant Kabir Nagar",
    "Saraikela-Kharsawan",
    "Saran",
    "Satara",
    "Satna",
    "Sawai Madhopur",
    "Sehore",
    "Senapati",
    "Seoni",
    "Serchhip",
    "Shahdara",
    "Shahdol",
    "Shahid Bhagat Singh Nagar",
    "Shahjahanpur",
    "Shajapur",
    "Shamli",
    "Sheikhpura",
    "Sheohar",
    "Sheopur",
    "Shi Yomi",
    "Shimla",
    "Shivamogga",
    "Shivpuri",
    "Shopiyan",
    "Shrawasti",
    "Siang",
    "Siddharthnagar",
    "Siddipet",
    "Sidhi",
    "Sikar",
    "Simdega",
    "Sindhudurg",
    "Singrauli",
    "Sipahijala",
    "Sirmaur",
    "Sirohi",
    "Sirsa",
    "Sitamarhi",
    "Sitapur",
    "Sivaganga",
    "Sivasagar",
    "Siwan",
    "Solan",
    "Solapur",
    "Sonbhadra",
    "Sonipat",
    "Sonitpur",
    "South 24 Parganas",
    "South Andaman",
    "South Delhi",
    "South East Delhi",
    "South Garo Hills",
    "South Goa",
    "South Salmara Mankachar",
    "South Sikkim",
    "South Tripura",
    "South West Delhi",
    "South West Garo Hills",
    "South West Khasi Hills",
    "Sri Muktsar Sahib",
    "Srikakulam",
    "Srinagar",
    "State Pool",
    "Subarnapur",
    "Sukma",
    "Sultanpur",
    "Sundargarh",
    "Supaul",
    "Surajpur",
    "Surat",
    "Surendranagar",
    "Surguja",
    "Suryapet",
    "Tamenglong",
    "Tapi",
    "Tarn Taran",
    "Tawang",
    "Tehri Garhwal",
    "Tengnoupal",
    "Tenkasi",
    "Thane",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvananthapuram",
    "Thiruvarur",
    "Thoothukkudi",
    "Thoubal",
    "Thrissur",
    "Tikamgarh",
    "Tinsukia",
    "Tirap",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "Tonk",
    "Tuensang",
    "Tumakuru",
    "Udaipur",
    "Udalguri",
    "Udham Singh Nagar",
    "Udhampur",
    "Udupi",
    "Ujjain",
    "Ukhrul",
    "Umaria",
    "Una",
    "Unnao",
    "Unokoti",
    "Upper Dibang Valley",
    "Upper Siang",
    "Upper Subansiri",
    "Uttar Bastar Kanker",
    "Uttar Dinajpur",
    "Uttara Kannada",
    "Uttarkashi",
    "Vadodara",
    "Vaishali",
    "Valsad",
    "Varanasi",
    "Vellore",
    "Vidisha",
    "Vijayapura",
    "Vikarabad",
    "Viluppuram",
    "Virudhunagar",
    "Visakhapatnam",
    "Vizianagaram",
    "Wanaparthy",
    "Warangal Rural",
    "Warangal Urban",
    "Wardha",
    "Washim",
    "Wayanad",
    "West Champaran",
    "West Delhi",
    "West Garo Hills",
    "West Godavari",
    "West Jaintia Hills",
    "West Kameng",
    "West Karbi Anglong",
    "West Khasi Hills",
    "West Siang",
    "West Sikkim",
    "West Singhbhum",
    "West Tripura",
    "Wokha",
    "Y.S.R. Kadapa",
    "Yadadri Bhuvanagiri",
    "Yadgir",
    "Yamunanagar",
    "Yanam",
    "Yavatmal",
    "Zunheboto",
  ];
  async function handleLocation () {
     try {
       const position = await new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(
           (position) => resolve(position),
           (error) => reject(error)
         );
       });
       const lat = position.coords.latitude;
       const long = position.coords.longitude;
    
       const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
       );

       const result = response.data;
       console.log(result.city)
       const city = result.city;
       if(districts.includes(city)){
       setData((prev)=>({
        ...prev,
        district:`${city}`
       }));
      alert(`district has been set to ${city}}`);
       }
       else{
        alert('The current location is not a valid district')
       }
     } catch (error) {
      alert(`Error: ${error.message}`);
     }
   };

   React.useEffect(() => {
    console.log(data)
   },[data])
   const [loading,setLoading]=React.useState(false)

     const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
     };
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <div className="w-full bg-slate-50">
        <div className="relative bg-slate-900 border-b border-slate-800">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-full h-full bg-slate-800/20 transform -skew-x-12"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="w-full md:w-1/2 text-center md:text-left z-10">
              <span className="inline-block py-1 px-3 rounded-md bg-amber-500/10 text-amber-500 text-sm font-semibold tracking-wider uppercase mb-4 border border-amber-500/20">Official Portal</span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                Welcome to <br /> <span className="text-5xl md:text-7xl text-amber-500">आवाज़</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Centralized Public Grievance Redress And Monitoring System. A transparent, effective, and accessible initiative by the Government of India.
              </p>
            </div>
            
            <div className="w-full md:w-5/12 max-w-md z-10 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-100 px-8 py-6 border-b border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-800 text-center tracking-tight">Citizen Registration</h3>
                  <p className="text-sm text-slate-500 text-center mt-1">Create an account to lodge a grievance</p>
                </div>
                
                <div className="px-8 py-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                      onChange={handleChange}
                    />
                    
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                      onChange={handleChange}
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password (Min. 6 chars)"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                        ref={password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-3 text-sm text-slate-500 hover:text-slate-800 font-medium"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      className={`w-full px-4 py-3 bg-slate-50 border ${showErrorMessage ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-amber-500'} rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-colors`}
                      onChange={checkPasswords}
                      ref={cPassword}
                    />

                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="Mobile Number"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                      onChange={handleChange}
                    />

                    <div className="flex gap-4">
                      <select
                        value={data.district}
                        name="district"
                        onChange={handleChange}
                        className="w-2/3 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors appearance-none"
                      >
                        <option value="">-- Select District --</option>
                        {districts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </select>
                      
                      <input
                        type="number"
                        name="age"
                        id="age"
                        placeholder="Age"
                        min="18"
                        className="w-1/3 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">
                        <button type="button" onClick={handleLocation} className="flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors">
                          <img src={location} alt="" className="h-4 w-4 mr-1 opacity-70" />
                          Detect Location
                        </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 mt-4 flex justify-center items-center shadow-md active:scale-95"
                      onClick={handleSubmit}
                    >
                      {loading ? <span className="animate-pulse">Processing...</span> : "Create Account"}
                    </button>
                    
                    <div className="text-center mt-6 pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-600">
                        Already have an account?{" "}
                        <NavLink to="/userlogin" className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
                          Login here
                        </NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
