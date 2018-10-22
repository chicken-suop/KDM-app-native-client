const getDaysData = () => {
  const data = [];

  const months = Object.freeze([
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]);
  for (let month = 0; month < 12; month += 1) {
    const date = new Date(2018, month, 1);
    while (date.getMonth() === month) {
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      const yyyy = date.getFullYear();
      if (dd < 10) dd = `0${dd}`;
      if (mm < 10) mm = `0${mm}`;
      data.push({
        date: {
          year: yyyy,
          month: mm,
          monthName: months[month],
          day: dd,
          fullDate: `${yyyy}-${mm}-${dd}`,
        },
        songs: [
          {
            id: 0,
            name: 'Prophesy',
            artist: 'Planetshakers',
          },
          {
            id: 1,
            name: 'Through it all',
            artist: 'Planetshakers',
          },
          {
            id: 2,
            name: 'Reckless Love',
            artist: 'Cory Asbury',
          },
          {
            id: 3,
            name: 'So will I',
            artist: 'Hillsong',
          },
        ],
        roles: [
          {
            id: 0,
            name: 'Piano',
            category: 'Worship',
            person: {
              name: 'John',
              lastName: 'Doe',
            },
          },
          {
            id: 1,
            name: 'Welcome',
            category: 'Welcome',
            person: {
              name: 'Mary',
              lastName: 'Doe',
            },
          },
          {
            id: 2,
            name: 'Lyrics',
            category: 'Media',
            person: {
              name: 'Bob',
              lastName: 'Gills',
            },
          },
          {
            id: 3,
            name: 'Lights',
            category: 'Media',
            person: {
              name: 'Francis',
              lastName: 'Dunget',
            },
          },
          {
            id: 4,
            name: 'Children',
            category: 'Children',
            person: {
              name: 'Mary',
              lastName: 'Doe',
            },
          },
          {
            id: 5,
            name: 'Lead singer',
            category: 'Worship',
            person: {
              name: 'Mary',
              lastName: 'Doe',
            },
          },
        ],
      });
      date.setDate(date.getDate() + 1);
    }
  }

  return data;
};

const daysData = getDaysData();

export default daysData;
