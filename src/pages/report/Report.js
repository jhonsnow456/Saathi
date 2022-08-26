import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import {
  AppConversionRates,
  SpeakingReport
} from '../../sections/report';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// @mui
import { Box, Card,Button, CardHeader } from '@mui/material';

// ----------------------------------------------------------------------
const percentage = 66;

function getErrorStatusColor(percentage) {
  if(percentage>70) return '#ff0000';
  if(percentage>50) return '#ff0000';
  if(percentage>30) return '#00FF00';
  if(percentage>20) return '#00FF00';
  if(percentage>10) return '#00FF00';
}

function getStyle(value) {
  
}
const circularStyles = buildStyles({
  // Rotation of path and trail, in number of turns (0-1)
  pathTransitionDuration: 0.5,
  // Colors
  pathColor: getErrorStatusColor(percentage),
  textColor: getErrorStatusColor(percentage),
  trailColor: '#d6d6d6',
})


export default function DashboardApp() {
  const theme = useTheme();

  const element = document.getElementById("root");
  const opt = {
    margin: 1,
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  async function download(){
    await window.print()
  }
  return (
    <Page title="Report">
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Your Test Report
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates
              title="Reading Test"
              subheader="Eyeball tracking test."
              chartData={[
                { label: 'Deviation Value', value: 240 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
              <Card>
                <CardHeader title="Speaking Test"/>
                <div  style={{display:"flex",  flexWrap:"wrap"}} >
                  <Grid item xs={12} md={12} lg={6}>
                    <Box sx={{ m: 5 }}>
                      <div style={{margin:"12px"}}>
                        <div>
                          <div>
                            <b>Repetition of words</b>
                          </div>
                          &nbsp;

                          <div>
                              Total Repeated Words : 4
                          </div>
                        </div>
                      </div>
                      &nbsp;

                      <div style={{margin:"12px"}}>
                        <div>
                          <div>
                            <b>Delayed Speech</b>
                          </div>
                          &nbsp;

                          <div>
                            <div>
                              Average Time Delay : 1300ms
                            </div>
                            <div>
                              Maximum Time Delay : 2400ms
                            </div>
                          </div>
                        </div>
                        <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        </div>
                      </div>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6} lg={6}>
                    <Box sx={{ mx: 3 }} dir="ltr">

                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <b>Recognizing Sound of word.</b>
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 1
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar styles={circularStyles} value={(1/5)*100} text={`${(1/5)*100}%`} />   
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <b>First and Last Sound of word.</b>
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 4
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar styles={circularStyles} value={(4/5)*100} text={`${(4/5)*100}%`} />   
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <b>Seprating compounded words.</b>
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 5
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar value={(5/5)*100} text={`${(5/5)*100}%`} />   
                      </div>
                    </div>
                    </Box>
                  </Grid>
                </div>
              </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
                <Card>
                    <CardHeader title="Writing Test" />
                      <Box sx={{ m:5, p:5 }}>
                        <div style={{display:"flex"}}>                        
                          <img src="https://learningabledkids.com/images/worksamples/k12worksamples/8thgradeessay.jpg" height={256} />
                        
                          <img src="https://fileuploadapp.blob.core.windows.net/tutorial-container/photo_2022-08-26_15-09-21.jpg" height={256} />
                        </div>
                    </Box>
                </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
              <Card>
                    <CardHeader title="Listening Test" />
                      <Box sx={{ m:1 }} dir="ltr">
                      <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <b>Phonological Awareness</b>
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 1
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar styles={circularStyles} value={(1/5)*100} text={`${(1/5)*100}%`} />   
                      </div>
                    </div>
                      &nbsp;&nbsp;
                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <b>Verbal Short Term Memory</b>
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 4
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar styles={circularStyles} value={(4/5)*100} text={`${(4/5)*100}%`} />   
                      </div>
                    </div>

                    </Box>
                </Card>
          </Grid>

          

          <Grid item xs={12} md={6} lg={6}>
              <Card>
                  <CardHeader title="Logic Test" />
                  <Box sx={{ mx: 3 }} dir="ltr">
                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                          Basic Calculations Skill
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 1
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar value={(1/5)*100} text={`${(1/5)*100}%`} />   
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                         Facts remembering score.
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 4
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar value={(4/5)*100} text={`${(4/5)*100}%`} />   
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                          Count related Awareness
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 5
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar value={(5/5)*100} text={`${(5/5)*100}%`} />   
                      </div>
                    </div>
                  </Box>

                  <div style={{ display: "flex", justifyContent:"space-around", height: 120 }}>
                      <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                          Numeric comparision skills.
                        </div>
                        <div style={{ display: "flex",}}>
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Incorrect : 5
                          </div>
                          &nbsp;&nbsp;
                          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            Total : 5
                          </div>
                        </div>
                      </div>
                      <div style={{ width: 100, height: 100, marginTop: "auto", marginBottom: "auto"  }}>
                        <CircularProgressbar value={(5/5)*100} text={`${(5/5)*100}%`} />   
                      </div>
                    </div>
                </Card>
          </Grid>


        {/* <Grid item xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ]}
            chartData={[
              {
                name: 'Team A',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Team B',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Team C',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid> */}



          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}
        </Grid>

        <div style={{display:"flex", margin:"34px"}}>
                    <Button title="Submit" onClick={download} size="large" variant="contained" style={{width: "100%"}}>
                        Download as sharable report.
                    </Button>
                </div>
      </Container>
    </Page>
  );
}
