import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//Import Icons
import {MdNotifications} from 'react-icons/md';
import {BsSearch} from 'react-icons/bs';
import {CgMenuLeft, CgMenuRight} from 'react-icons/cg';
import { DiJqueryLogo } from "react-icons/di";

//Internal Import
import Style from './NavBar.module.css';
import {Discover, HelpCenter, Notification, Profile, SideBar} from './index';
import {Button} from '../componentsindex';
import images from '../../img';

//IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  //---- UseState Components ----
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notification, setNotification] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  const openDiscoverMenu = () => {
    if (!discover) {
      setDiscover(true);
      setHelp(false);
      setProfile(false);
      setNotification(false);
    } else {
      setDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!help) {
      setDiscover(false);
      setHelp(true);
      setProfile(false);
      setNotification(false);
    } else {
      setHelp(false);
    }
  };

  const openNotification = () => {
    if (!notification) {
      setDiscover(false);
      setHelp(false);
      setProfile(false);
      setNotification(true);
    } else {
      setNotification(false);
    }
  }

  const openProfile = () => {
    if (!profile) {
      setDiscover(false);
      setHelp(false);
      setProfile(true);
      setNotification(false);
    } else {
      setProfile(false);
    }
  }

  const openSideBar = () => {
    if (!openSideMenu) {
      setOpenSideMenu(true);
    } else {
      setOpenSideMenu(false);
    }
  }

  //SMART CONTRACT SECTION
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  return (
    <div className = {Style.navbar}>
      <div className = {Style.navbar_container}>
       {/* Left Section */}
        <div className = {Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => router.push("/")} />
          </div>
          <div className = {Style.navbar_container_left_box_input}>
              <div className = {Style.navbar_container_left_box_input_box}>
                <input type = 'text' placeholder = "Search NFT" />
                <BsSearch onClick={ () => {} } className = {Style.search_icon} />
              </div>
          </div>
        </div>

       {/* Right Section */}
        <div className = {Style.navbar_container_right}>

         {/* Discover Component */}
          <div className = {Style.navbar_container_right_discover}>
            <p onClick = { () => openDiscoverMenu() }>Discover</p>
            {discover && (
              <div className = {Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

         {/* Help Center Component */}
          <div className = {Style.navbar_container_right_help}>
            <p onClick={ () => openHelpMenu() }>Help Center</p>
            {help && (
              <div className = {Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

         {/* Notification Component */}
          <div className = {Style.navbar_container_right_notify}>
            <MdNotifications
              className = {Style.notify}
              onClick = {() => openNotification()}
              />
            { notification && <Notification /> }
          </div>

         {/* Create Button Section */}
         <div className={Style.navbar_container_right_button}>
            {currentAccount == "" ? (
              <Button btnName="Connect" handleClick={() => connectWallet()} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div> 

         {/* User Profile Component */}
         <div className={Style.navbar_container_right_profile_box}>
            <div className={Style.navbar_container_right_profile}>
              <Image
                src={images.user1}
                alt="Profile"
                width={40}
                height={40}
                onClick={() => openProfile()}
                className={Style.navbar_container_right_profile}
              />

              {profile && <Profile currentAccount={currentAccount} />}
            </div>
          </div>

         {/* Menu Button */}
          <div className = {Style.navbar_container_right_menuBtn}>
            <CgMenuRight
              className = {Style.menuIcon}
              onClick = {() => openSideBar()}
            />  
          </div>
        </div>
      </div>

       {/* SideBar Component */}
        {openSideMenu && (
          <div className={Style.sideBar}>
            <SideBar
              setOpenSideMenu={setOpenSideMenu}
              currentAccount={currentAccount}
              connectWallet={connectWallet}
            />
          </div>
        )}
    </div>
  );
};

export default NavBar;