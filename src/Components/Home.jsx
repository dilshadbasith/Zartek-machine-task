// import React, { useContext, useEffect, useState } from "react";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
//   Card,
//   Typography,
//   Badge,
// } from "@material-tailwind/react";
// import axios from "axios";
// import Counter from "./Counter";
// import { FaShoppingCart } from "react-icons/fa";
// import { myContext } from "./Context";
// import "../../src/App.css";

// function Home() {
//   const [hotelDetails, setHotelDetails] = useState([]);
//   const { cart } = useContext(myContext);

//   async function getDetails() {
//     try {
//       const response = await axios.get(
//         "https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb"
//       );
//       setHotelDetails(response?.data?.data[0]?.table_menu_list);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

//   useEffect(() => {
//     getDetails();
//   }, []);

//   console.log(hotelDetails);

//   return (
//     <div>
//       <div className="flex justify-between">
//         <h1 className="text-left text-gray-600 font-bold text-xl">
//           UNI Resto Cafe
//         </h1>
//         <Badge content={cart.length}>
//           <FaShoppingCart className="text-2xl" />
//         </Badge>
//       </div>

//       <Tabs value="html" className="max-w-[80rem] pt-2">
//         <div className="tabs-scrollable">
//           <TabsHeader
//             className="bg-transparent border-b-2 tabs-header"
//             indicatorProps={{
//               className:
//                 "border-b-2 border-red-700 text-red-700 rounded-none shadow-none",
//             }}
//           >
//             {hotelDetails.map((item) => (
//               <Tab
//                 key={item.menu_category_id}
//                 value={item.menu_category}
//                 defaultValue={item.menu_category[0]}
//               >
//                 {item.menu_category}
//               </Tab>
//             ))}
//           </TabsHeader>
//         </div>
//         <TabsBody>
//           {hotelDetails.map((category) => (
//             <TabPanel
//               key={category.menu_category}
//               value={category.menu_category}
//             >
//               <Card className="h-full w-full">
//                 <table className="w-full  table-auto text-left">
//                   <tbody>
//                     {category.category_dishes.map((dish) => {
//                       return (
//                         <tr key={dish.dish_id}>
//                           <td className="p-4 border-b border-blue-gray-50 flex flex-col">
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="text-lg font-bold"
//                             >
//                               {dish.dish_name}
//                             </Typography>
//                             <Typography
//                               variant="small"
//                               color="blue-gray"
//                               className="text-sm font-bold"
//                             >
//                               {dish.dish_currency} {dish.dish_price}
//                             </Typography>
//                             <Typography
//                               variant="small"
//                               className="text-xm font-bold text-gray-500 max-w-2xl"
//                             >
//                               {dish.dish_description}
//                             </Typography>
//                             {dish.dish_Availability == true ? (
//                               <Counter />
//                             ) : (
//                               <p className="text-red-900 text-sm font-bold">
//                                 Not Available
//                               </p>
//                             )}
//                             {dish.addonCat.length > 0 && (
//                               <p className="text-red-900 text-sm font-bold">
//                                 Customizations Available
//                               </p>
//                             )}
//                           </td>
//                           <td className="p-4 border-b border-blue-gray-50">
//                             <Typography
//                               variant="small"
//                               color="black"
//                               className="font-bold"
//                             >
//                               {dish.dish_calories} Calories
//                             </Typography>
//                           </td>
//                           <td className="p-4 border-b border-blue-gray-50">
//                             <img
//                               className="h-[5rem] w-[5rem] sm:h-auto sm:w-auto md:h-[5rem] md:w-[5rem] rounded-lg"
//                               src={dish.dish_image}
//                               alt="image"
//                             />
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </Card>
//             </TabPanel>
//           ))}
//         </TabsBody>
//       </Tabs>
//     </div>
//   );
// }

// export default Home;

import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
  Badge,
} from "@material-tailwind/react";
import axios from "axios";
import Counter from "./Counter";
import { FaShoppingCart } from "react-icons/fa";
import { myContext } from "./Context";
import "../../src/App.css";

function Home() {
  const [hotelDetails, setHotelDetails] = useState([]);
  const { cart } = useContext(myContext);
  const [defaultTabValue, setDefaultTabValue] = useState(null);

  async function getDetails() {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb"
      );
      setHotelDetails(response?.data?.data[0]?.table_menu_list);
      if (response?.data?.data[0]?.table_menu_list.length > 0) {
        setDefaultTabValue(
          response.data.data[0].table_menu_list[0].menu_category_id
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (defaultTabValue) {
      const tab = document.querySelector(`[data-value="${defaultTabValue}"]`);
      if (tab) {
        tab.click();
      }
    }
  }, [defaultTabValue]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-left text-gray-600 font-bold text-xl">
          UNI Resto Cafe
        </h1>
        <div className="flex gap-3">
          <h1 className="text-gray-500 font-bold text-sm">My Orders</h1>
          <Badge content={cart.length}>
            <FaShoppingCart className="text-2xl text-gray-500" />
          </Badge>
        </div>
      </div>

      <Tabs
        value={defaultTabValue} // Set the default tab value here
        className="max-w-[80rem] pt-2"
      >
        <div className="tabs-scrollable">
          <TabsHeader
            className="bg-transparent border-b-2 tabs-header"
            indicatorProps={{
              className:
                "border-b-2 border-red-700 text-red-700 rounded-none shadow-none",
            }}
          >
            {hotelDetails.map((item) => (
              <Tab
                key={item.menu_category_id}
                value={item.menu_category_id} // Use the ID as value
              >
                {item.menu_category}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <TabsBody>
          {hotelDetails.map((category) => (
            <TabPanel
              key={category.menu_category_id}
              value={category.menu_category_id} // Use the ID as value
            >
              <Card className="h-full w-full">
                <table className="w-full table-auto text-left">
                  <tbody>
                    {category.category_dishes.map((dish) => (
                      <tr key={dish.dish_id}>
                        <td className="p-4 border-b border-blue-gray-50 flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-lg font-bold"
                          >
                            {dish.dish_name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="text-sm font-bold"
                          >
                            {dish.dish_currency} {dish.dish_price}
                          </Typography>
                          <Typography
                            variant="small"
                            className="text-xm font-bold text-gray-500 max-w-2xl"
                          >
                            {dish.dish_description}
                          </Typography>
                          {dish.dish_Availability == true ? (
                            <Counter />
                          ) : (
                            <p className="text-red-900 text-sm font-bold">
                              Not Available
                            </p>
                          )}
                          {dish.addonCat.length > 0 && (
                            <p className="text-red-900 text-sm font-bold">
                              Customizations Available
                            </p>
                          )}
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold"
                          >
                            {dish.dish_calories} Calories
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <img
                            className="h-12 w-12 sm:h-auto sm:w-auto md:h-12 md:w-12 rounded-lg"
                            src={dish.dish_image}
                            alt="image"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Home;
