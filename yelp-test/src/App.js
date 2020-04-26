import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Empty, Spin, Alert, Descriptions } from 'antd';
import './App.css';

const corsAnyWhere = 'https://cors-anywhere.herokuapp.com/';
const searchKeyword = 'ice cream';
const yelpBaseAPI = 'https://api.yelp.com/v3/businesses';
const yelpSearchAPI = '/search';
const yelpReviewAPI = '/reviews'
const apiKey = 'Bearer FPVp0uhiUocZ4TabHLroiQxf0O-mvMewm-ybjRdn-cTBl8haC2zO8grb_JkEMInon1FS3c5LpJXK6vJ67wm6qaz1B0LV2SCM9EaUutnTXMMREJGk3zrkBiaUPKSkXnYx';

const { Item } = Descriptions;

function App() {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {

        try {
          // load the yelp data based search keyword
          const { data: { businesses } } = await axios.get(
            `${corsAnyWhere}${yelpBaseAPI}${yelpSearchAPI}`,
            {
              headers: {
                Authorization: apiKey
              },
              params: {
                location: 'oregon',
                latitude: coords.latitude,
                longitude: coords.longitude,
                term: searchKeyword,
                limit: 5,
                sort_by: 'best_match'
              }
            }
          );

          // load review related to each business
          const reviewPromises = businesses.map((businessInfo) => {
            return axios.get(
              `${corsAnyWhere}${yelpBaseAPI}/${businessInfo.id}${yelpReviewAPI}`,
              {
                headers: {
                  Authorization: apiKey
                }
              }
            ).then(response => {
              return {
                ...businessInfo,
                topReviews: response.data.reviews
              };
            });
          });

          const results = await Promise.all(reviewPromises);


          setSearchResults(results.sort((a, b) => {
            if (a.name === b.name) {
              return 0;
            }
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
          }));
          setLoading(false);
        }
        catch (err) {
          setApiError({ error: err });
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Spin tip="Loading Ice cream details..." spinning={loading} >
        {Object.keys(apiError).length > 0 && <Alert type='error' message={JSON.stringify(apiError)} />}
        {
          searchResults.length ?
            searchResults.map((businessInfo, index) => {
              const {
                name, location, topReviews
              } = businessInfo;
              return (
                <Descriptions title={name}  key={`businessinfo-${index}`} bordered column={1} style={{textAlign: 'left', padding: 20}}>
                  <Item label="Business Name">{name}</Item>
                  <Item label="Business Address">
                    {`${location.address1}
                  ${location.address2 ? ', ' + location.address2 : ''}
                  ${location.address3 ? ', ' + location.address3 : ''}
                  ${location.city ? ', ' + location.city : ''}
                  ${location.country ? ', ' + location.country : ''}`}
                  </Item>
                  <Item label="Review Message">
                    <p>{topReviews.length > 0 ? topReviews[0].text : 'No Review found'}</p>
                    <p>{topReviews.length > 0 ? `Rated as: ${topReviews[0].rating}` : ''}</p>
                  </Item>
                  <Item label="Review Given By:">
                    <p>{topReviews.length > 0 ? topReviews[0].user.name : 'No Review found'}</p>
                  </Item>

                  {
                    Object.keys(businessInfo).map((key, index) => {
                      if (['name', 'location', 'topReviews'].indexOf(key) < 0) {
                        return (
                          <Item key={`remaining-keys-info-${index}`} label={key}>
                            {
                              typeof businessInfo[key] === 'object' ? JSON.stringify(businessInfo[key]) : businessInfo[key]
                            }
                          </Item>
                        );
                      }
                      return null;
                    })
                  }
                </Descriptions>
              )
            })
            : <Empty />
        }
      </Spin>
    </div>
  );
}

export default App;
