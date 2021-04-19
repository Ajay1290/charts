const data = [
  {x: new Date('2008-04-03'), y: 0},
  {x: new Date('2008-05-02'), y: 0},
  {x: new Date('2008-06-02'), y: 0},
  {x: new Date('2008-07-01'), y: 0},
  {x: new Date('2008-08-01'), y: 0},
  {x: new Date('2008-09-01'), y: 0},
  {x: new Date('2008-10-01'), y: 0},
  {x: new Date('2008-11-03'), y: 0},
  {x: new Date('2008-12-01'), y: 0},
  {x: new Date('2009-01-01'), y: 0},
  {x: new Date('2009-02-02'), y: 0},
  {x: new Date('2009-03-02'), y: 0},
  {x: new Date('2009-04-01'), y: 0},
  {x: new Date('2009-05-04'), y: -27.0469},
  {x: new Date('2009-06-01'), y: -11.4974},
  {x: new Date('2009-07-01'), y: -1.7262},
  {x: new Date('2009-08-03'), y: 23.8953},
  {x: new Date('2009-09-01'), y: 16.3722},
  {x: new Date('2009-10-01'), y: 36.7769},
  {x: new Date('2009-11-03'), y: 68.0644},
  {x: new Date('2009-12-01'), y: 116.7677},
  {x: new Date('2010-01-04'), y: 97.6859},
  {x: new Date('2010-02-01'), y: 110.3956},
  {x: new Date('2010-03-02'), y: 121.7317},
  {x: new Date('2010-04-01'), y: 127.8085},
  {x: new Date('2010-05-03'), y: 90.8374},
  {x: new Date('2010-06-01'), y: 44.5352},
  {x: new Date('2010-07-01'), y: 43.6299},
  {x: new Date('2010-08-02'), y: 42.8667},
  {x: new Date('2010-09-01'), y: 38.3482},
  {x: new Date('2010-10-01'), y: 39.7008},
  {x: new Date('2010-11-01'), y: 44.7492},
  {x: new Date('2010-12-01'), y: 27.7324},
  {x: new Date('2011-01-03'), y: 21.2318},
  {x: new Date('2011-02-01'), y: 10.8977},
  {x: new Date('2011-03-01'), y: 6.0909},
  {x: new Date('2011-04-01'), y: 6.7512},
  {x: new Date('2011-05-02'), y: 8.1743},
  {x: new Date('2011-06-01'), y: 8.724},
  {x: new Date('2011-07-01'), y: 3.741},
  {x: new Date('2011-08-01'), y: -3.421},
  {x: new Date('2011-09-02'), y: -14.4543},
  {x: new Date('2011-10-03'), y: -23.0117},
  {x: new Date('2011-11-01'), y: -17.1342},
  {x: new Date('2011-12-01'), y: -19.8926},
  {x: new Date('2012-01-02'), y: -25.6956},
  {x: new Date('2012-02-01'), y: -9.0404},
  {x: new Date('2012-03-01'), y: -2.5823},
  {x: new Date('2012-04-02'), y: -8.202},
  {x: new Date('2012-05-02'), y: -9.1976},
  {x: new Date('2012-06-01'), y: -14.016},
  {x: new Date('2012-07-02'), y: -7.9463},
  {x: new Date('2012-08-01'), y: -5.6757},
  {x: new Date('2012-09-03'), y: 3.5357},
  {x: new Date('2012-10-01'), y: 13.5098},
  {x: new Date('2012-11-01'), y: 9.1739},
  {x: new Date('2012-12-03'), y: 22.3991},
  {x: new Date('2013-01-01'), y: 32.4433},
  {x: new Date('2013-02-01'), y: 20.4717},
  {x: new Date('2013-03-01'), y: 10.6693},
  {x: new Date('2013-04-01'), y: 11.0364},
  {x: new Date('2013-05-02'), y: 14.1647},
  {x: new Date('2013-06-03'), y: 20.2801},
  {x: new Date('2013-07-01'), y: 15.6373},
  {x: new Date('2013-08-01'), y: 9.1935},
  {x: new Date('2013-09-02'), y: 5.2295},
  {x: new Date('2013-10-01'), y: 1.5668},
  {x: new Date('2013-11-01'), y: 9.7046},
  {x: new Date('2013-12-02'), y: 5.4595},
  {x: new Date('2014-01-01'), y: 6.3423},
  {x: new Date('2014-02-03'), y: 2.0685},
  {x: new Date('2014-03-03'), y: 12.3812},
  {x: new Date('2014-04-01'), y: 22.3589},
  {x: new Date('2014-05-02'), y: 19.4846},
  {x: new Date('2014-06-02'), y: 29.3395},
  {x: new Date('2014-07-01'), y: 43.6946},
  {x: new Date('2014-08-01'), y: 41.4832},
  {x: new Date('2014-09-01'), y: 62.0098},
  {x: new Date('2014-10-01'), y: 52.8398},
  {x: new Date('2014-11-03'), y: 49.59},
  {x: new Date('2014-12-01'), y: 55.0355},
  {x: new Date('2015-01-01'), y: 52.1547},
  {x: new Date('2015-02-02'), y: 49.7722},
  {x: new Date('2015-03-02'), y: 55.0394},
  {x: new Date('2015-04-01'), y: 45.5853},
  {x: new Date('2015-05-04'), y: 38.3889},
  {x: new Date('2015-06-01'), y: 27.8533},
  {x: new Date('2015-07-01'), y: 23.9236},
  {x: new Date('2015-08-03'), y: 26.0556},
  {x: new Date('2015-09-01'), y: 13.4277},
  {x: new Date('2015-10-01'), y: 11.6953},
  {x: new Date('2015-11-02'), y: 11.258},
  {x: new Date('2015-12-01'), y: 9.2449},
  {x: new Date('2016-01-01'), y: 8.2805},
  {x: new Date('2016-02-01'), y: -3.8135},
  {x: new Date('2016-03-01'), y: -9.4489},
  {x: new Date('2016-04-01'), y: -0.269},
  {x: new Date('2016-05-02'), y: 4.0911},
  {x: new Date('2016-06-01'), y: 4.9942},
  {x: new Date('2016-07-01'), y: 10.9117},
  {x: new Date('2016-08-01'), y: 11.9491},
  {x: new Date('2016-09-01'), y: 18.0875},
  {x: new Date('2016-10-03'), y: 22.1894},
  {x: new Date('2016-11-01'), y: 18.5802},
  {x: new Date('2016-12-01'), y: 10.3195},
  {x: new Date('2017-01-02'), y: 5.8906},
  {x: new Date('2017-02-01'), y: 21.605},
  {x: new Date('2017-03-01'), y: 42.5367},
  {x: new Date('2017-04-03'), y: 34.8097},
  {x: new Date('2017-05-02'), y: 38.6192},
  {x: new Date('2017-06-01'), y: 35.1732},
  {x: new Date('2017-07-03'), y: 33.7243},
  {x: new Date('2017-08-01'), y: 29.0099},
  {x: new Date('2017-09-01'), y: 24.4077},
  {x: new Date('2017-10-03'), y: 25.2548},
  {x: new Date('2017-11-01'), y: 32.3649},
  {x: new Date('2017-12-01'), y: 49.4263},
  {x: new Date('2018-01-01'), y: 60.8568},
  {x: new Date('2018-02-01'), y: 49.1713},
  {x: new Date('2018-03-01'), y: 43.1616},
  {x: new Date('2018-04-02'), y: 36.0706},
  {x: new Date('2018-05-02'), y: 31.8159},
  {x: new Date('2018-06-01'), y: 26.2283},
  {x: new Date('2018-07-02'), y: 16.1318},
  {x: new Date('2018-08-01'), y: 18.06},
  {x: new Date('2018-09-03'), y: 22.723},
  {x: new Date('2018-10-01'), y: 11.0499},
  {x: new Date('2018-11-01'), y: 0.4563},
  {x: new Date('2018-12-03'), y: -4.473},
  {x: new Date('2019-01-01'), y: -7.2498},
  {x: new Date('2019-02-01'), y: -9.0484},
  {x: new Date('2019-03-01'), y: -9.2606},
  {x: new Date('2019-04-01'), y: 1.1472},
  {x: new Date('2019-05-02'), y: -9.4167},
  {x: new Date('2019-06-03'), y: -4.0086},
  {x: new Date('2019-07-01'), y: -1.621},
  {x: new Date('2019-08-01'), y: -15.4269},
  {x: new Date('2019-09-03'), y: -19.5777},
  {x: new Date('2019-10-01'), y: -8.2483},
  {x: new Date('2019-11-01'), y: -5.0631},
  {x: new Date('2019-12-02'), y: -8.2227},
  {x: new Date('2020-01-01'), y: -9.0285},
  {x: new Date('2020-02-03'), y: -5.5484},
  {x: new Date('2020-03-02'), y: -10.781},
  {x: new Date('2020-04-01'), y: -42.2014},
  {x: new Date('2020-05-04'), y: -34.6487},
  {x: new Date('2020-06-01'), y: -34.3027},
  {x: new Date('2020-07-01'), y: -24.3036},
  {x: new Date('2020-08-03'), y: -8.6136},
  {x: new Date('2020-09-01'), y: -0.0423},
  {x: new Date('2020-10-01'), y: 0.1142},
  {x: new Date('2020-11-02'), y: -5.8059},
  {x: new Date('2020-12-01'), y: 11.9584},
  {x: new Date('2021-01-01'), y: 19.7101},
  {x: new Date('2021-02-01'), y: 16.8663},
  {x: new Date('2021-02-05'), y: 25.2638},
];
export default data;
