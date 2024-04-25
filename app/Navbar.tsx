"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseAuth } from "@/firebase/firebaseConfig";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import addUsersToFirebase from "@/utils/addUsers";
import toast, { Toaster } from "react-hot-toast";
import { tailwindToast } from "./issues/list/Mobiletoast";

const NavBar = () => {
  const [user, setuser] = useState<any>("");
  const addUsers = async (userObj: any) => {
    try {
      const msg = await addUsersToFirebase(userObj);
    } catch (err) {}
  };
  useEffect(() => {
    const storedData = window.sessionStorage.getItem("guestDataID");
    console.log(storedData);
    if (storedData) {
      const userObj: {} = {
        uid: "guestuserlogin00112233",
        displayName: "Guest User",
        email: "guestuserlogin00112233@gmail.com",
        photoURL: "",
        timestamp: new Date(),
      };
      setuser(userObj);
    }
  }, []);

  useEffect(() => {
    const checkNavbar = () => {
      const navbar = document.querySelector('[data-id="navbarContainer"]');
      if (!navbar) {
        window.location.reload();
      }
    };
    checkNavbar();
  }, []);

  useEffect(() => {
    if (user && !(user.uid === "guestuserlogin00112233")) {
      const userObj: {} = {
        uid: user.uid,
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
      };
      addUsers(userObj);
    }

    const timeoutId = setTimeout(() => {
      if (!user) {
        tailwindToast(
          "Use Guest Authentication",
          "If you're encountering an error with Google Provider(Firebase authentication). Please try logging in as a guest user."
        );
      }
      if (user && !(user.uid === "guestuserlogin00112233")) {
        toast.success("Login Successfully!");
      }
    }, 2000);

    if (user?.uid === "guestuserlogin00112233") return;

    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setuser(currentUser);
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [user]);
  const handleSign = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const data = await signInWithPopup(firebaseAuth, provider);
    } catch (err) {}
  };
  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      if (user.uid === "guestuserlogin00112233") {
        window.sessionStorage.removeItem("guestDataID");
        setuser("");
      }
      toast.success("Logout Successfully!");
    } catch (err) {}
  };
  const handleGuestUser = async () => {
    const userObj: {} = {
      uid: "guestuserlogin00112233",
      displayName: "Guest User",
      email: "guestuserlogin00112233@gmail.com",
      photoURL: "",
      timestamp: new Date(),
    };
    await addUsers(userObj);
    window.sessionStorage.setItem("guestDataID", "guestuserlogin00112233");
    setuser(userObj);
    toast.success("Login Successfully as guest!");
  };
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
      className="border-b mb-5 px-5 py-3  shadow-lg"
      data-id="navbarContainer"
    >
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus
            userData={user}
            handleLogout={handleLogout}
            handleSign={handleSign}
            handleGuestUser={handleGuestUser}
          />
          <Toaster position="bottom-right" reverseOrder={false} />
        </Flex>
      </Container>
    </motion.nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = (props: any) => {
  const { displayName, email, photoURL, uid } = props?.userData || {};
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            <Avatar
              src={photoURL}
              fallback={displayName ? displayName.split(" ")[0][0] : "?"}
              size="2"
              className="cursor-pointer border-white bg-white"
              referrerPolicy="no-referrer"
              variant="soft"
            />
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {email && uid && displayName && (
            <DropdownMenu.Item disabled>{displayName}</DropdownMenu.Item>
          )}
          {email && uid && displayName && <DropdownMenu.Separator />}
          <Link href={"/contact"}>
            <DropdownMenu.Item>Contact Us</DropdownMenu.Item>
          </Link>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Text
                as="p"
                color="green"
                align="center"
                weight="bold"
                className="cursor-pointer"
              >
                Login
              </Text>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item onClick={() => props?.handleSign()}>
                Google Provider{" "}
                <Text
                  as="span"
                  color="green"
                  align="center"
                  weight="light"
                  className="text-sm hover:text-white"
                  size="1"
                >
                  (Recommended)
                </Text>
              </DropdownMenu.Item>
              <Link href={"#"}>
                <DropdownMenu.Item onClick={props?.handleGuestUser}>
                  Guest User
                </DropdownMenu.Item>
              </Link>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          {email && uid && displayName && (
            <DropdownMenu.Item
              color="red"
              onClick={() => props?.handleLogout()}
            >
              Logout
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
export const dynamic = "force-dynamic";
export default NavBar;
