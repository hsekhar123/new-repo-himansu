import React from 'react';
import {View, FlatList, StyleSheet, Text,ActivityIndicator} from 'react-native';
interface IProps {}
interface IState {
  data: DataType[];
  limit:number,
  end:boolean
}
interface DataType {
    city: string;
    country: string;
    date_of_birth: string;
    email: string;
    first_name: string;
    gender: string;
    id: number;
    job: string;
    last_name: string;
    latitude: number;
    longitude: number;
    phone: string;
    profile_picture: string;
    state: string;
    street: string;
    zipcode: string;
}
class UserData extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: [],
      limit:10,
      end:false
    };
  }
  componentDidMount() {
    this.fetchUserDetails();
  }
  fetchUserDetails = async () => {
    const response = await fetch(`https://api.slingacademy.com/v1/sample-data/users?limit=${this.state.limit}`);
    const result = await response.json();
    if(result.success){
        this.setState({
            data:[this.state.data,...result.users],
        })
    }else{
        this.setState({end:true})
    }

  };
  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if(prevState.limit<this.state.limit){
        this.fetchUserDetails()
    }
  }
  renderItem = (item: DataType) => {
    const {id,first_name,email}=item
    return (
      <View style={styles.listItem}>
        <Text style={styles.userId}>user_id:- {id}</Text>
        <Text style={styles.title}>Name-: {first_name}</Text>
        <View style={styles.bodySection}>
        <Text style={styles.email}>Email:- {email}</Text>
        </View>
      </View>
    );
  };
  endFunction=()=>{
    this.setState({limit:this.state.limit+10})
 
  }
  render() {
    const {data} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Userdata screen</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => this.renderItem(item)}
          onEndReached={()=>this.endFunction()}
          ListFooterComponent={()=>!this.state.end&&<ActivityIndicator size={"large"} color={"#fff"} />}
        />
      </View>
    );
  }
}
export default UserData;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(70,130,180)',
    alignItems: 'center',
    paddingHorizontal:10
  },
  header: {
    height: '6%',
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  listItem: {
    borderWidth: 1,
    justifyContent: 'center',
    paddingVertical: 5,
    marginVertical: 5,
    borderRadius: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgb(0,31,63)',
  },
  userId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  address: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  bodySection:{
    marginTop:10
  }
});


