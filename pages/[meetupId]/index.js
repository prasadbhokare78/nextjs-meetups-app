import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://prasadbhokare:prasadbhokare123@cluster0.ztbfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  // db method to connect to database
  const db = client.db();

  // Creating a collection for data
  const meetupsCollection = db.collection("meetup");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://prasadbhokare:prasadbhokare123@cluster0.ztbfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  // db method to connect to database
  const db = client.db();

  // Creating a collection for data
  const meetupsCollection = db.collection("meetup");

  const selectedMeetups = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  //fetch data for a sinle meetup
  return {
    props: {
      meetupData: {
        id: selectedMeetups._id.toString(),
        title: selectedMeetups.title,
        address: selectedMeetups.address,
        description: selectedMeetups.description,
        image: selectedMeetups.image,
      },
    },
  };
}

export default MeetupDetails;
