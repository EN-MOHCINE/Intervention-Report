import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator, Button } from 'react-native';
import { RefreshControl, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';





export default function TabTwoScreen() {
  const [dataapi, setDataapi] = useState<any[]>([]);
  const [dataapi_search, setdataapi_search] = useState<any[]>(dataapi);
   // add correct typing if needed
  const [isloading, setisloading] = useState<boolean>(true); // add correct typing if needed
  // const [refreshing, setRefreshing] = useState(false); // add correct typing if
  const [body, setbody] = useState('');
  const [title, settitle] = useState(''); // add correct typing if needed
  const [term_search ,setterm_search] = useState('');
  
  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await response.json();
      setDataapi(json);
      setdataapi_search(json)
      dataapi ? setisloading(false) : setisloading(true); // update loading state based on response
      // console.log('Data fetched successfully:', json);
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };

  const addpost = async () => {
    // fetch('https://jsonplaceholder.typicode.com/posts' ).then((response)=>
    // {
    //   return response.json() ;
    // }).then((data)=>{
    //   console.log(data) ;
    // }) }


    try {
      // Send a POST request to add a new post
      // const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId: 2,
      //     title: title,
      //     body: body,
      //   }),
      // });
    
      // Parse the JSON response
      
    
      // Create a new post object using a dynamic ID
      const newPost =  {
        userId: 2,
        id: Math.floor(Math.random() * 2000  ), // Generating a dynamic ID for the new post
        title: title,
        body: body,
      };
    
      // Check if the post with the same ID already exists
      const findpost = dataapi_search.find((item) => item.id == newPost.id);
      
      if (findpost) {
        alert('Post with this ID already exists.');
      } else {
        setdataapi_search([newPost, ...dataapi]);
        setbody('');
        settitle('');
      }
    } catch (error) {
      console.error('Error adding post:', error);
    }
    
  };

  function search () {
        console.log(term_search);
        setDataapi(dataapi)
      const  data_filtre= dataapi.filter((item)=>item.id.toString() === term_search);
      console.log(data_filtre);
      if (data_filtre.length !== 0) {
          setdataapi_search(data_filtre);
    }
  }

  function handleDelete(id: any){
    setdataapi_search(dataapi_search.filter((item) => item.id !== id));
    
  
  }
  
  // function handlrefresh() {
  //   setRefreshing(true); // update refreshing state to true
  //   fetchData()
  //     setRefreshing(false); // update refreshing state to false after data is fetched

  // }

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  if (isloading) {

      return(
        <View style={styles.loadingContainer}>
          <ActivityIndicator   size="large" color="black" />
          <Text style={styles.loadingText}>Loading data.....</Text>
        </View>
      )
  }

  return (
    <SafeAreaView style={styles.container}
    >
      <ScrollView  
      // refreshControl={
      //     <RefreshControl refreshing={refreshing} onRefresh={handlrefresh} />
      // }
      >
      <View>
        <Text style={styles.text}>Add Post  </Text>


        <View style={styles.container2}>
          <Icon style ={{marginLeft :10  ,borderRadius :3 , borderWidth: 1,padding: 6,borderColor: '#000'}} onPress={search} name="search-outline" size={20} color="#000" />
          <TextInput style={styles.inputsearch} onChangeText={setterm_search} placeholder="search  post by id "/>
        </View>
        <View style={styles.container1}>
          <TextInput style={styles.inpuaddposts} value={title} onChangeText={settitle} placeholder="Title" />
          <TextInput style={styles.inpuaddposts} value={body} onChangeText={setbody} placeholder="Title" />
          <Button title='Add post' onPress={addpost} />
        </View>
        
                  <FlatList
                    data={dataapi_search}
                    keyExtractor={(_, index) => index.toString()} // unique key for each item
                    renderItem={({ item }) => (
                      <View style={styles.card}>
                        <View >

                        <Text style={styles.card_title} >{ item.title }</Text> 
                        <Text style={styles.card_title} >Id  :{item.id}</Text>
                        </View>
                        <Text style={styles.card_body}>{item.body ? item.body : 'No Body'}</Text>
                        <Icon
                            style={styles.deleteIcon}
                            name="trash-outline" // Ionicons trash icon
                            size={20}
                            color="#000"
                            onPress={()=> {handleDelete(item.id)}} // Clear the input on press
                          />
                      </View>
                    )}
                    
                    ListEmptyComponent={<Text>No data available</Text>}
                    ListHeaderComponent={<Text style ={styles.card_header}>Show post of users </Text>}
                    // refreshing={refreshing}
                    // onRefresh={handlrefresh}
                  />
        </View>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    
    backgroundColor: '#F5F5F5',
  },
  deleteIcon :{
    marginRight : 10,
    marginTop : 10,
    position : 'absolute',
    padding :5 ,
    borderRadius : 8,
    backgroundColor :'red' ,
    color: '#fff',
    right : 0,
  } ,
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  card_title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color :"coral" ,
  },
  card_body: {
    fontSize: 16,
    marginBottom: 10,
  },
  card: {
    borderWidth: 0.5,
    borderColor: 'dark',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 5,
},
card_header :{
  fontSize: 22,
  fontWeight: 'bold',
  color :"green" ,
  marginBottom: 10,
  padding: 10,
  textAlign :"center"
} ,
loadingContainer : {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',

} ,
loadingText :{
  color: 'black',
  fontSize: 18,
  marginBottom: 10,
} ,
container1: {
  marginVertical: 10,
  marginHorizontal: 10,
},
inpuaddposts: {
  borderWidth: 1,
  borderColor: 'gray',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
},
inputsearch: {
  flex: 1,
  borderColor: '#000',
  borderWidth: 1, // added border width to make it visible
  padding: 8, // padding inside the input for better spacing
  borderRadius: 5, // rounded corners
  marginLeft: 10, // spacing between icon and input
  color: 'black', // text color inside input
},
container2: {
  flexDirection: 'row',
  alignItems: 'center',
  
  borderRadius: 5,
  padding: 10,
  marginVertical: 10, // added margin to handle spacing between containers
  width: '80%', // width as a percentage of the screen width
  alignSelf: 'center', // centers the container horizontally
},

});
