import gql from 'graphql-tag';

const createEvent = gql`
  mutation {
    createEvent (
      data: {
        start: "2018-11-04T11:00",
        end: "2018-11-04T12:30",
        name: "Service",
        location: { connect: { name: "KDM" } }
        category: { connect: { name: "" } }
        notifications: {
          create: [
            {
              date: "2018-11-03T16:30",
              type: Notification
            },
            {
              date: "2018-11-03T16:30",
              type: Email
            }
          ]
        },
        people: {
          create: [
            {
              status: Waiting,
              user: { connect: { email: "abbie.schep@gmail.com" } },
              role: {
                connect: {
                  name: "Sound",
                  category: "Media"
                }
              }
            },
            {
              status: Waiting,
              user: { connect: { email: "adrian.schep@gmail.com" } },
              role: {
                connect: {
                  name: "Piano",
                  category: "Worship"
                }
              }
            },
          ]
        },
        songs: {
          connect: [
            { name: "Prophesy" },
            { name: "Through it all" },
            { name: "Reckless Love" },
            { name: "So will I" },
          ]
          # create: [
          #   {
          #     name: "Prophesy",
          #     artist: { connect: { name: "Planetshakers" } }
          #   },
          #   {
          #     name: "Through it all",
          #     artist: { connect: { name: "Planetshakers" } }
          #   },
          #   {
          #     name: "Reckless Love",
          #     artist: { connect: { name: "Cory Asbury" } }
          #   },
          #   {
          #     name: "So will I",
          #     artist: { connect: { name: "Hillsong" } }
          #   },
          # ]
        },
      }
    ) {
      id
    }
  }
`;

export default createEvent;
