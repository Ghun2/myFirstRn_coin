import React from 'react'
import	{	StyleSheet,	Text,	View, ScrollView	}	from 'react-native';	
import CoinItem from '../components/CoinItem'
import { getCoinIconUri } from '../libs/Constants';

class CoinView extends React.Component	{	
    constructor(props) {
        super(props);
        this.state = {
            coinDatas: [],
            isLoaded:false,
        };
    }

    _getCoinDatas = async(limit) => {
        this.setState({
            isLoading:true,
        });

        try{
            const response = await fetch('https://api.coinmarketcap.com/v1/ticker/?limit=${limit}');
            const responseJson = await response.json();

            const date = new Date();
            const now = date.toLocaleString()

            console.log(now)

            if(this.props.refreshDate != null){
                this.props.refreshDate(now);
            }

            await this.setState({
                coinDatas:responseJson,
                isLoading:false,
            });
        } catch(error) {
            console.error('_getCoinDatas',error);
        }
    }

    componentDidMount() {
        this._getCoinDatas(10);

        setInterval(() => {
            this._getCoinDatas(10);
            console.log('toggled!');
        },10000);
    }

    render	()	{	
        let coinItems = this.state.coinDatas.map( (data, index) => {
            const {rank, name, price_usd, market_cap_usd, last_updated} = data; // Destructuring
            return (
                <CoinItem
                key={index}
                rank={rank}
                name={name}
                price={price_usd}
                volumn={market_cap_usd}
                iconUri={getCoinIconUri(name)}
                />
            );
        });


        return	(	
            <ScrollView style={[styles.container, this.props.style]}>
                {coinItems}
            </ScrollView>
        )	
    }	
}	

const styles	=	StyleSheet.create({	
    container:	{	
        flex: 1,	
        flexDirection: 'column',	//	row
        backgroundColor: 'skyblue',	
        // justifyContent: 'center',	
        // alignItems: 'center',	
    },	
});	
export default CoinView;


const sampleData = [
    {
        "id": "bitcoin", 
        "name": "Bitcoin", 
        "symbol": "BTC", 
        "rank": "1", 
        "price_usd": "9569.24017229", 
        "price_btc": "1.0", 
        "24h_volume_usd": "26381882452.2", 
        "market_cap_usd": "170545983953", 
        "available_supply": "17822312.0", 
        "total_supply": "17822312.0", 
        "max_supply": "21000000.0", 
        "percent_change_1h": "0.32", 
        "percent_change_24h": "-10.99", 
        "percent_change_7d": "-26.05", 
        "last_updated": "1563345448"
    }, 
    {
        "id": "ethereum", 
        "name": "Ethereum", 
        "symbol": "ETH", 
        "rank": "2", 
        "price_usd": "201.440835399", 
        "price_btc": "0.02109", 
        "24h_volume_usd": "9800192772.99", 
        "market_cap_usd": "21540536338.0", 
        "available_supply": "106932322.0", 
        "total_supply": "106932322.0", 
        "max_supply": null, 
        "percent_change_1h": "0.35", 
        "percent_change_24h": "-11.9", 
        "percent_change_7d": "-35.03", 
        "last_updated": "1563345442"
    }, 
    {
        "id": "ripple", 
        "name": "XRP", 
        "symbol": "XRP", 
        "rank": "3", 
        "price_usd": "0.2978991239", 
        "price_btc": "0.00003119", 
        "24h_volume_usd": "1646687878.21", 
        "market_cap_usd": "12680551709.0", 
        "available_supply": "42566596173.0", 
        "total_supply": "99991588101.0", 
        "max_supply": "100000000000", 
        "percent_change_1h": "-0.15", 
        "percent_change_24h": "-5.27", 
        "percent_change_7d": "-24.55", 
        "last_updated": "1563345423"
    }
];