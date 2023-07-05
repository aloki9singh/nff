async function handler (req,res){
    const Female = "/componentsgraphics/common/settings/profile/Female.svg"
    const data = [
        {
            image: Female,
            name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 5
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 7
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 10
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 15
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 20
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 20
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 23
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 11
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 9
        },
        {
          image: Female,
          name: "Rachit Rajput",
          ID: 53424,
          Class: 4,
          Active: "Yesterday",
          Courses: 8,
          Enrolled: 25
        },
      ]
    res.status(200).send({"success":true, "coursedata":data})
}

export default handler