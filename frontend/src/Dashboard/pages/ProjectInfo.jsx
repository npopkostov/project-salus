import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import { AppContext } from "../../context/AppContext";
import MernStack from "../assets/mernStack.png";
import MernStackNight from "../assets/mernStackNight.png";
import ProfilePic from "../assets/ProfilePic.png";
import ProfilePicNight from "../assets/ProfilePicNight.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectInfo = () => {
  const { dashboardPage } = useContext(AppContext);
  const navigate = useNavigate();

  // Token auth
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth/login");
    }

    if (token) {
      axios
        .post("/auth/dashboard", { token: token })
        .then((response) => {
          if (response.status === 200) {
            dashboardPage.setUserName(response.data.username);
            dashboardPage.setUserRole(response.data.role);
            dashboardPage.setUserMail(response.data.mail);
            dashboardPage.setIsAdmin(response.data.role === "admin" ? true : false);
            dashboardNotes.setFetchNotes((prev) => prev + 1);
          } else {
            console.log("Response was not successful. Status:", response.status);
            navigate("/auth/login");
          }
        })
        .catch((error) => {
          if (error.status === 403) {
            navigate("/auth/login");
          } else {
            console.log("Error", error);
          }
        });
    }
  }, []);

  return (
    <>
      {/* Main div */}
      <div
        className={
          dashboardPage.isMinimized === false
            ? `grid grid-cols-[15%_85%] w-screen h-screen cursor-pointer transition-all duration-300`
            : `grid grid-cols-[3%_97%] w-screen h-screen cursor-pointer transition-all duration-300`
        }
      >
        {/* navbar */}
        <Navbar />
        {/* dashboard/pages */}
        <div
          className={
            dashboardPage.isNightMode === false
              ? "flex flex-col bg-white"
              : "flex flex-col bg-[#2A3447]"
          }
        >
          <Toolbar />
          <div className="flex flex-grow flex-col items-center p-5 gap-5">
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex p-5 space-y-14 flex-col  w-1/2 border rounded-md"
                  : "flex p-5 space-y-14 flex-col w-1/2 border rounded-md border-[#333F55]"
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "text-2xl font-bold"
                    : "text-2xl font-bold text-white"
                }
              >
                {" "}
                Project Info:
              </div>
              <img
                src={dashboardPage.isNightMode === false ? MernStack : MernStackNight}
                className="px-40"
              />
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "pl-20 space-y-5 pr-20 font-light text-justify"
                    : "pl-20 space-y-5 pr-20 font-light text-justify text-white"
                }
              >
                {" "}
                <p>
                  <text className="font-bold">Project Salus</text> (derived from the Latin word
                  *Salus*, meaning "safety") is an interactive web application developed using the{" "}
                  <text className="font-bold">MERN</text> (MongoDB, Express, React, Node.js) stack.
                  This platform provides users with an intuitive way to explore and analyze
                  historical events across Macedonia, with data sourced from the Ministry of
                  Internal Affairs’ daily bulletins available at{" "}
                  <a href="https://mvr.gov.mk/dnevni-bilteni">mvr.gov.mk/dnevni-bilteni</a>,
                  starting from 2015.
                </p>
                <p>
                  Using <text className="font-bold">Node.js</text> and{" "}
                  <text className="font-bold">Puppeteer</text>, I developed a web scraper that
                  gathers data from the Ministry of Internal Affairs’ daily bulletins. To date, the
                  scraper has processed over 73,000 events, each analyzed to identify the event’s{" "}
                  <text className="font-bold">location</text> and{" "}
                  <text className="font-bold">type</text> (e.g., physical violence, drug-related
                  incident, shooting, fire, or other type of event). This data is then structured
                  for user-friendly access and visualization within the Project Salus platform,
                  offering users insights into safety patterns across Macedonia.
                </p>
                <p>
                  Each event is displayed on an interactive map, along with a{" "}
                  <strong>confidence score</strong> indicating location accuracy. The confidence
                  score reflects the estimated radius within which the event occurred:
                </p>
                <ul className="space-y-2">
                  <li>
                    <strong>100%</strong> confidence score: event occurred within 200–500m of the
                    marker
                  </li>
                  <li>
                    <strong>90%</strong> confidence score: event occurred within 500–1,000m
                  </li>
                  <li>
                    <strong>60%</strong> confidence score: event occurred within 1,000–1,500m
                  </li>
                  <li>
                    <strong>50%</strong> confidence score: event occurred within 10 km
                  </li>
                  <li>
                    <strong>30%</strong> confidence score: event occurred within 20 km of the map
                    marker
                  </li>
                </ul>
                <p>
                  This scoring system provides users with a clearer understanding of the event’s
                  location precision on the map.
                </p>
                <p className="font-bold">Upcoming updates:</p>
                <ul className="space-y-2">
                  <li>
                    <text className="font-bold">Statistics:</text> The Statistics feature will allow
                    users to conduct detailed searches in the database to generate statistical data.
                    Users will be able to perform various analyses, such as:
                    <ul className="space-y-2 ml-2 mt-2">
                      <li>
                        <strong>Occurrence Analysis:</strong> Assessing how often specific types of
                        events, like drug-related incidents, occur in particular locations (e.g.,
                        drug events in Skopje, animal bites on Bul. "Partizanski Odredi", shootings
                        in Bitola, identity theft in Shtip, or missing persons in specific villages)
                        and for specific timeframes.{" "}
                        <em>
                          (small hint: unfortunately, drug-related events have quadrupled in the
                          last 3-4 years in each location in Macedonia)
                        </em>
                      </li>

                      <li>
                        <strong>Comparison Analysis:</strong> Evaluating relationships between
                        events and days of the week, or specific periods of the year (e.g., higher
                        occurrence of incidents during weekends or holidays).
                      </li>
                      <li>
                        <strong>Per Capita Analysis:</strong> Calculating the rates of incidents
                        (e.g., missing persons, animal bites, physical violence etc.) per capita for
                        each region, municipality, location, city, village in Macedonia. This
                        analysis will help users understand how safe or unsafe different
                        neighborhoods, cities, or regions in Macedonia are.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={
                dashboardPage.isNightMode === false
                  ? "flex p-5 space-y-10 flex-col w-1/2 border rounded-md"
                  : "flex p-5 space-y-10 flex-col w-1/2 border rounded-md border-[#333F55]"
              }
            >
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "text-2xl font-bold"
                    : "text-2xl font-bold text-white"
                }
              >
                {" "}
                About The Creator:
              </div>
              <div
                className={
                  dashboardPage.isNightMode === false
                    ? "flex items-center ml-5 gap-5 "
                    : "flex items-center ml-5 gap-5 text-white"
                }
              >
                <img
                  src={dashboardPage.isNightMode === false ? ProfilePic : ProfilePicNight}
                  className="h-[150px] p-2 bg-black rounded-full "
                />{" "}
                <div className="flex flex-col space-y-5">
                  <div className="text-xl font-bold"> Nikola Pop-Kostov</div>
                  <div className="flex gap-5">
                    <NavLink to="https://github.com/npopkostov">
                      <FontAwesomeIcon
                        className={
                          dashboardPage.isNightMode === false ? "h-8 text-black" : "h-8 text-white"
                        }
                        icon={faLinkedin}
                      />
                    </NavLink>
                    <NavLink to="https://github.com/npopkostov">
                      <FontAwesomeIcon
                        className={
                          dashboardPage.isNightMode === false ? "h-8 text-black" : "h-8 text-white"
                        }
                        icon={faGithub}
                      />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
