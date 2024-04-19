import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";

function Home() {
  const [hotelDetails, setHotelDetails] = useState([]);

  async function getDetails() {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/f47694b8-4d45-4c30-aed0-dd82bb4025fb"
      );
      setHotelDetails(response?.data?.data[0]?.table_menu_list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  console.log(hotelDetails);

  return (
    <div>
      <h1 className="text-left text-gray-600 font-bold">UNI Resto Cafe</h1>
      <Tabs value="html" className="max-w-[80rem] pt-2">
        <TabsHeader
          className="bg-transparent border-b-2"
          indicatorProps={{
            className: "border-b-2 border-red-700 text-red-700 rounded-none shadow-none",
          }}
        >
          {hotelDetails.map((item) => (
            <Tab
              key={item.menu_category_id}
              value={item.menu_category}
              defaultValue={item.menu_category[0]}
            >
              {item.menu_category}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {hotelDetails.map((category) => (
            <TabPanel
              key={category.menu_category}
              value={category.menu_category}
            >
              <Card className="h-full w-full">
                <table className="w-full min-w-max table-auto text-left">
                  <tbody>
                    {category.category_dishes.map((dish) => {
                      return (
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
                            <img className="h-12 w-12" src={dish.dish_image} alt="image" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </Card>
              {/* <ul>
                {category.category_dishes.map((dish) => (
                  <li key={dish.dish_id}>
                    <div>
                      <div>{dish.dish_name}</div>
                    </div>
                  </li>
                ))}
              </ul> */}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Home;
