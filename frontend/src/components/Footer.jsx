import React from "react";
import { Footer } from "flowbite-react";
import { FOOTER_DATA, FOOTER_PERSONAL_DATA, NAVIGATION_LOGO, SOCIAL_MEDIA } from "../data/data";
import '../index.css'

const FooterComponent = () => {
  return (
    <Footer container className=" bg-transparent">
      <div className="w-full mt-3 ">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="pl-5" >
            <div className="p-4">  {NAVIGATION_LOGO.logo}</div>
            <Footer.Link className="list-none text-sm  w-1/2 text-gray-300 ">{FOOTER_DATA.description}</Footer.Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 p-6 w-1/2 justify-center">
            {FOOTER_DATA.tabs.map((items, index) => (
              <div key={index} className="flex flex-col">
                <Footer.Title title={items.tittle} className="primary-color font-bold text-lg " />
                <div className="">
                  {items.columns.map((column, colIndex) => (
                    <Footer.LinkGroup key={colIndex} col>
                      <Footer.Link className="text-gray-300 p-1" href={column.link}>{column.name}</Footer.Link>
                    </Footer.LinkGroup>
                  ))}
                </div>
              </div>
            ))}
          </div>



        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between" >
          <Footer.Copyright href={FOOTER_PERSONAL_DATA.Details.developerWebsite} by={FOOTER_PERSONAL_DATA.Details.developerName} year={FOOTER_PERSONAL_DATA.Details.CreatedYear} />

          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center p-1">
            {SOCIAL_MEDIA.map((items, index) => (
              <Footer.Icon className="primary-color" target="_blank" key={index} href={items.link} icon={items.logo} />
            ))}
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
