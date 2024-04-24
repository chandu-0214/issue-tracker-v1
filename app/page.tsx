import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";
import Copyright from "./components/Copyright";
export default function Home() {
  return (
    <>
      <Grid
        columns={{ initial: "1", sm: "2" }}
        gap="5"
        justify="center"
        align="center"
      >
        <Flex
          className="text-center"
          direction="column"
          justify="center"
          align="center"
          gap="2"
        >
          <Heading
            className="text-4xl font-bold mb-4 text-gray-900"
            align="center"
            size="7"
          >
            Welcome to Bug Tracker
          </Heading>
          <Text align="center" size="4" className="text-lg text-gray-700 mb-8">
            <span className="font-bold">Facing bugs in your projects?</span> Our
            bug tracking system is here to rescue! Easily track, manage, and
            resolve bugs, ensuring smooth project development and deployment.
          </Text>
        </Flex>
        <div>
          <Image
            src="https://img.freepik.com/free-vector/qa-engineer-flat-concept-with-software-developer-symbols-flat-vector-illustration_1284-78162.jpg?t=st=1713276391~exp=1713279991~hmac=c404f1d549ddd6e960c12282a07277c415597fca2101af1dd4c76923223d372a&w=500"
            width={500}
            height={500}
            alt="Picture of the author"
            className="hidden md:block"
          />
        </div>
      </Grid>
      <Copyright />
    </>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
