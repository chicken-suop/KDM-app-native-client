// const getDaysData = () => {
//   const data = [];
//
//   const months = Object.freeze([
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
//   ]);
//   for (let month = 0; month < 12; month += 1) {
//     const date = new Date(2018, month, 1);
//     while (date.getMonth() === month) {
//       let dd = date.getDate();
//       let mm = date.getMonth() + 1;
//       const yyyy = date.getFullYear();
//       if (dd < 10) dd = `0${dd}`;
//       if (mm < 10) mm = `0${mm}`;
//       data.push({
//         date: {
//           year: yyyy,
//           month: mm,
//           monthName: months[month],
//           day: dd,
//           fullDate: `${yyyy}-${mm}-${dd}`,
//         },
//         songs: [
//           {
//             id: 0,
//             name: 'Prophesy',
//             artist: 'Planetshakers',
//           },
//           {
//             id: 1,
//             name: 'Through it all',
//             artist: 'Planetshakers',
//           },
//           {
//             id: 2,
//             name: 'Reckless Love',
//             artist: 'Cory Asbury',
//           },
//           {
//             id: 3,
//             name: 'So will I',
//             artist: 'Hillsong',
//           },
//         ],
//         roles: [
//           {
//             id: 0,
//             name: 'Piano',
//             category: 'Worship',
//             person: {
//               name: 'John',
//               lastName: 'Doe',
//             },
//           },
//           {
//             id: 1,
//             name: 'Welcome',
//             category: 'Welcome',
//             person: {
//               name: 'Mary',
//               lastName: 'Doe',
//             },
//           },
//           {
//             id: 2,
//             name: 'Lyrics',
//             category: 'Media',
//             person: {
//               name: 'Bob',
//               lastName: 'Gills',
//             },
//           },
//           {
//             id: 3,
//             name: 'Lights',
//             category: 'Media',
//             person: {
//               name: 'Francis',
//               lastName: 'Dunget',
//             },
//           },
//           {
//             id: 4,
//             name: 'Children',
//             category: 'Children',
//             person: {
//               name: 'Mary',
//               lastName: 'Doe',
//             },
//           },
//           {
//             id: 5,
//             name: 'Lead singer',
//             category: 'Worship',
//             person: {
//               name: 'Mary',
//               lastName: 'Doe',
//             },
//           },
//         ],
//       });
//       date.setDate(date.getDate() + 1);
//     }
//   }
//
//   return data;
// };
//
// const daysData = getDaysData();

const daysData = [
  {
    id: 'cjo066niq00540a22nn618bw5',
    start: '2018-11-04T11:00:00.000Z',
    end: '2018-11-04T12:30:00.000Z',
    name: 'Service',
    location: {
      name: 'KDM',
    },
    notifications: [
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Notification',
      },
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Email',
      },
    ],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Abbie Schep',
          email: 'abbie.schep@gmail.com',
        },
        role: {
          name: 'Sound',
          category: 'Media',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Adrian Schep',
          email: 'adrian.schep@gmail.com',
        },
        role: {
          name: 'Piano',
          category: 'Worship',
        },
        status: 'Waiting',
      },
    ],
    songs: [
      {
        name: 'Prophesy',
        artist: {
          id: 'cjo05sy6z001d0a22wm7zwiit',
          name: 'Planetshakers',
        },
      },
      {
        name: 'Reckless Love',
        artist: {
          id: 'cjo05sy79001h0a22kiwdbvid',
          name: 'Cory Asbury',
        },
      },
      {
        name: 'So will I',
        artist: {
          id: 'cjo05sy7g001l0a224rw5v95t',
          name: 'Hillsong',
        },
      },
      {
        name: 'Through it all',
        artist: {
          id: 'cjo05sy6z001d0a22wm7zwiit',
          name: 'Planetshakers',
        },
      },
    ],
    category: {
      name: '',
    },
  },
  {
    id: 'cjnug93ju001i0b09biyfqf24',
    start: '2018-10-29T00:00:00.000Z',
    end: '2018-10-29T00:00:00.000Z',
    name: 'Youth',
    location: {
      name: 'KDM',
    },
    notifications: [],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
    ],
    songs: [],
    category: null,
  },
  {
    id: 'cjnugf3uo001z0b09xfzwvuap',
    start: '2018-10-29T00:00:00.000Z',
    end: '2018-10-29T00:00:00.000Z',
    name: 'Youth',
    location: {
      name: 'KDM',
    },
    notifications: [],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
    ],
    songs: [],
    category: null,
  },
  {
    id: 'cjo052x3p000e0a22t47i8hxh',
    start: '2018-10-29T00:00:00.000Z',
    end: '2018-10-29T00:00:00.000Z',
    name: 'Youth',
    location: {
      name: 'KDM',
    },
    notifications: [],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
    ],
    songs: [],
    category: null,
  },
  {
    id: 'cjo05sy5g000s0a22ofqp05lk',
    start: '2018-11-05T11:00:00.000Z',
    end: '2018-11-05T12:30:00.000Z',
    name: 'Service',
    location: {
      name: 'KDM',
    },
    notifications: [
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Notification',
      },
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Email',
      },
    ],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Abbie Schep',
          email: 'abbie.schep@gmail.com',
        },
        role: {
          name: 'Sound',
          category: 'Media',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Adrian Schep',
          email: 'adrian.schep@gmail.com',
        },
        role: {
          name: 'Piano',
          category: 'Worship',
        },
        status: 'Waiting',
      },
    ],
    songs: [
      {
        name: 'Prophesy',
        artist: {
          id: 'cjo05sy6z001d0a22wm7zwiit',
          name: 'Planetshakers',
        },
      },
      {
        name: 'Reckless Love',
        artist: {
          id: 'cjo05sy79001h0a22kiwdbvid',
          name: 'Cory Asbury',
        },
      },
      {
        name: 'So will I',
        artist: {
          id: 'cjo05sy7g001l0a224rw5v95t',
          name: 'Hillsong',
        },
      },
    ],
    category: {
      name: 'Super Sunday',
    },
  },
  {
    id: 'cjo0666os004c0a22czxmlhrd',
    start: '2018-11-04T11:00:00.000Z',
    end: '2018-11-04T12:30:00.000Z',
    name: 'Service',
    location: {
      name: 'KDM',
    },
    notifications: [
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Notification',
      },
      {
        date: '2018-11-03T16:30:00.000Z',
        type: 'Email',
      },
    ],
    people: [
      {
        user: {
          name: 'Elliot',
          email: 'elliot.schep@gmail.com',
        },
        role: {
          name: 'Organiser',
          category: 'Defaults',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Abbie Schep',
          email: 'abbie.schep@gmail.com',
        },
        role: {
          name: 'Sound',
          category: 'Media',
        },
        status: 'Waiting',
      },
      {
        user: {
          name: 'Adrian Schep',
          email: 'adrian.schep@gmail.com',
        },
        role: {
          name: 'Piano',
          category: 'Worship',
        },
        status: 'Waiting',
      },
    ],
    songs: [
      {
        name: 'Prophesy',
        artist: {
          id: 'cjo05sy6z001d0a22wm7zwiit',
          name: 'Planetshakers',
        },
      },
      {
        name: 'Reckless Love',
        artist: {
          id: 'cjo05sy79001h0a22kiwdbvid',
          name: 'Cory Asbury',
        },
      },
      {
        name: 'So will I',
        artist: {
          id: 'cjo05sy7g001l0a224rw5v95t',
          name: 'Hillsong',
        },
      },
      {
        name: 'Through it all',
        artist: {
          id: 'cjo05sy6z001d0a22wm7zwiit',
          name: 'Planetshakers',
        },
      },
    ],
    category: {
      name: '',
    },
  },
];

export default daysData;
