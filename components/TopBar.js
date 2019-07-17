import React from 'react';	
import	{	StyleSheet,	Text,	View, Button	}	from 'react-native';	
class TopBar extends React.Component	{	
    render()	{	
        return	(	
            <View style={styles.container}>
                <Text></Text>
                <View>
                    <Text style={{fontSize:20,color:"white"}}>{this.props.title}</Text>
                    <Text style={{fontSize:10,textAlign:'center',color:"white"}}>{this.props.refreshDate || '-'}</Text>
                </View>
                <Text></Text>
            </View>
        );	
    }	
}

const styles	=	StyleSheet.create({	
    container:	{	
            alignSelf: 'stretch',	
            height: 52,	
            flexDirection: 'row',	//	row
            backgroundColor: '#FF5733',	
            alignItems: 'center',	
            justifyContent: 'space-between',	
            paddingLeU: 10,	
            paddingRight: 10
    }	
});	
export default TopBar;	