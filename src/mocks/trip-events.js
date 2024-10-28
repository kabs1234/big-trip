export const TRIP_EVENTS = [{
  'id': '0',
  'type': 'sightseeing',
  'date_from': '2024-10-10T12:00:00.000Z',
  'date_to': '2024-10-10T12:45:00.000Z', // 45 minutes
  'destination': {
    'name': 'Paris',
    'description': 'Paris, with a beautiful old town, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8707481281219598',
      'description': 'Paris zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9424835338362019',
      'description': 'Paris kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.8179032454573003',
      'description': 'Paris zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.25352136394405433',
      'description': 'Paris street market'
    }]
  },
  'base_price': 1000,
  'is_favorite': false,
  'offers': []
}, {
  'id': '1',
  'type': 'bus',
  'date_from': '2024-10-11T08:00:00.000Z',
  'date_to': '2024-10-11T15:30:00.000Z', // 7 hours 30 minutes
  'destination': {
    'name': 'Venice',
    'description': 'Venice, with crowded streets, in a middle of Europe, with a beautiful old town, for those who value comfort and coziness.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.9931806873529456',
      'description': 'Venice zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6521772874848712',
      'description': 'Venice zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.22703485072897855',
      'description': 'Venice city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5063591880698002',
      'description': 'Venice parliament building'
    }]
  },
  'base_price': 1000,
  'is_favorite': true,
  'offers': [1, 2, 3]
}, {
  'id': '2',
  'type': 'bus',
  'date_from': '2024-10-09T08:00:00.000Z',
  'date_to': '2024-10-13T08:00:00.000Z', // 4 days
  'destination': {
    'name': 'Rome',
    'description': 'Rome, in a middle of Europe, with a beautiful old town, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8098053236841025',
      'description': 'Rome central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.4684142390037982',
      'description': 'Rome park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.045143609866025614',
      'description': 'Rome street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.4156992830919348',
      'description': 'Rome biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6245065931414491',
      'description': 'Rome city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3105509106822093',
      'description': 'Rome central station'
    }]
  },
  'base_price': 500,
  'is_favorite': true,
  'offers': [1, 2, 3]
}, {
  'id': '3',
  'type': 'check-in',
  'date_from': '2024-10-10T15:00:00.000Z',
  'date_to': '2024-10-10T15:20:00.000Z', // 20 minutes
  'destination': {
    'name': 'Venice',
    'description': 'Venice, is a beautiful city, a true asian pearl, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.18481318295799243',
      'description': 'Venice street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6418624692131059',
      'description': 'Venice zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.37672417593795204',
      'description': 'Venice street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.852493237811268',
      'description': 'Venice kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.18084207987212553',
      'description': 'Venice parliament building'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.10203626986072067',
      'description': 'Venice zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5631945745592468',
      'description': 'Venice embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.7972961730543551',
      'description': 'Venice zoo'
    }]
  },
  'base_price': 1000,
  'is_favorite': true,
  'offers': [1, 4]
}, {
  'id': '4',
  'type': 'flight',
  'date_from': '2024-10-11T04:29:08.211Z',
  'date_to': '2024-10-12T05:00:28.000Z',
  'destination': {
    'name': 'Madrid',
    'description': 'Madrid, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.7074386195988209',
      'description': 'Madrid central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.4935060932168518',
      'description': 'Madrid central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9259165959276345',
      'description': 'Madrid park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5272254808900452',
      'description': 'Madrid biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.812454665507836',
      'description': 'Madrid embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6714427647866248',
      'description': 'Madrid city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.7219932167140877',
      'description': 'Madrid central station'
    }]
  },
  'base_price': 500,
  'is_favorite': false,
  'offers': [1, 2, 3]
}, {
  'id': '5',
  'type': 'flight',
  'date_from': '2024-10-11T17:41:28.000Z',
  'date_to': '2024-10-12T10:56:36.350Z',
  'destination': {
    'name': 'Geneva',
    'description': 'Geneva, is a beautiful city, with crowded streets, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8737329862082146',
      'description': 'Geneva zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.1875269730092335',
      'description': 'Geneva parliament building'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5626245501521674',
      'description': 'Geneva city centre'
    }]
  },
  'base_price': 700,
  'is_favorite': false,
  'offers': [4, 5, 6]
}, {
  'id': '6',
  'type': 'taxi',
  'date_from': '2024-10-12T10:56:36.350Z',
  'date_to': '2024-10-12T22:28:58.819Z',
  'destination': {
    'name': 'Helsinki',
    'description': 'Helsinki, with a beautiful old town, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.2425841767192729',
      'description': 'Helsinki central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.46134122170266956',
      'description': 'Helsinki biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.7804252250107335',
      'description': 'Helsinki street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6709387714752324',
      'description': 'Helsinki zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3735498692023451',
      'description': 'Helsinki kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.13625751285434728',
      'description': 'Helsinki park'
    }]
  },
  'base_price': 600,
  'is_favorite': false,
  'offers': [1, 3, 5]
}, {
  'id': '7',
  'type': 'restaurant',
  'date_from': '2024-10-12T22:28:58.819Z',
  'date_to': '2024-10-13T01:37:16.407Z',
  'destination': {
    'name': 'Rome',
    'description': 'Rome, is a beautiful city.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.348350693783833',
      'description': 'Rome biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.7548224282802158',
      'description': 'Rome street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.09564518813293388',
      'description': 'Rome biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.47953337701586185',
      'description': 'Rome park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.29099925883678934',
      'description': 'Rome parliament building'
    }]
  },
  'base_price': 900,
  'is_favorite': false,
  'offers': [1, 2]
}, {
  'id': '8',
  'type': 'drive',
  'date_from': '2024-10-13T01:37:16.407Z',
  'date_to': '2024-10-13T17:51:22.265Z',
  'destination': {
    'name': 'Monaco',
    'description': 'Monaco, a true asian pearl, with crowded streets, in a middle of Europe, with a beautiful old town, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.9959886638331872',
      'description': 'Monaco city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3493774735291917',
      'description': 'Monaco embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.40118878948450987',
      'description': 'Monaco street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.2645562900094822',
      'description': 'Monaco street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3830112500648666',
      'description': 'Monaco central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.36521970395666425',
      'description': 'Monaco street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.010533506369963197',
      'description': 'Monaco street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3482045254888162',
      'description': 'Monaco park'
    }]
  },
  'base_price': 800,
  'is_favorite': false,
  'offers': [1, 2]
}, {
  'id': '9',
  'type': 'flight',
  'date_from': '2024-10-13T17:51:22.265Z',
  'date_to': '2024-10-14T02:22:16.338Z',
  'destination': {
    'name': 'Rome',
    'description': 'Rome, middle-eastern paradise, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.3854085616586487',
      'description': 'Rome kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.38441105050877655',
      'description': 'Rome city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.8601915460266001',
      'description': 'Rome kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9464102661681217',
      'description': 'Rome embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.2650599443818962',
      'description': 'Rome zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5020502170836483',
      'description': 'Rome central station'
    }]
  },
  'base_price': 300,
  'is_favorite': false,
  'offers': [1, 4]
}, {
  'id': '10',
  'type': 'drive',
  'date_from': '2024-10-14T02:22:16.338Z',
  'date_to': '2024-10-14T10:59:54.415Z',
  'destination': {
    'name': 'Barcelona',
    'description': 'Barcelona, with crowded streets, with a beautiful old town, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8644163465644397',
      'description': 'Barcelona biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6149598042725914',
      'description': 'Barcelona park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.0696810531423',
      'description': 'Barcelona parliament building'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9937507537871624',
      'description': 'Barcelona city centre'
    }]
  },
  'base_price': 400,
  'is_favorite': true,
  'offers': [1, 2]
}, {
  'id': '11',
  'type': 'taxi',
  'date_from': '2024-10-14T10:59:54.415Z',
  'date_to': '2024-10-15T10:28:02.534Z',
  'destination': {
    'name': 'Den Haag',
    'description': 'Den Haag, in a middle of Europe, for those who value comfort and coziness, a perfect place to stay with a family.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.764204235408374',
      'description': 'Den Haag kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.17269569123376072',
      'description': 'Den Haag biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.11242435285804242',
      'description': 'Den Haag kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.92045990742555',
      'description': 'Den Haag street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.15917431054317444',
      'description': 'Den Haag street market'
    }]
  },
  'base_price': 300,
  'is_favorite': true,
  'offers': [3, 5]
}, {
  'id': '12',
  'type': 'ship',
  'date_from': '2024-10-15T10:28:02.534Z',
  'date_to': '2024-10-15T20:25:00.624Z',
  'destination': {
    'name': 'Rotterdam',
    'description': 'Rotterdam, a true asian pearl, in a middle of Europe, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8467286437399091',
      'description': 'Rotterdam parliament building'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.24512059033818545',
      'description': 'Rotterdam city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3404289974038506',
      'description': 'Rotterdam city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.26471508978777725',
      'description': 'Rotterdam biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9072746468635544',
      'description': 'Rotterdam zoo'
    }]
  },
  'base_price': 300,
  'is_favorite': false,
  'offers': [1, 2, 3, 4, 5]
}, {
  'id': '13',
  'type': 'taxi',
  'date_from': '2024-10-15T20:25:00.624Z',
  'date_to': '2024-10-16T19:14:43.753Z',
  'destination': {
    'name': 'Rotterdam',
    'description': 'Rotterdam, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.4861619105858981',
      'description': 'Rotterdam biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6382354681408533',
      'description': 'Rotterdam central station'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.022349173951110135',
      'description': 'Rotterdam biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.603831701110104',
      'description': 'Rotterdam park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.0589319587233228',
      'description': 'Rotterdam biggest supermarket'
    }]
  },
  'base_price': 400,
  'is_favorite': false,
  'offers': [3, 5]
}, {
  'id': '14',
  'type': 'sightseeing',
  'date_from': '2024-10-16T19:14:43.753Z',
  'date_to': '2024-10-17T06:53:14.541Z',
  'destination': {
    'name': 'Nagasaki',
    'description': 'Nagasaki, with crowded streets, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.22806828455350403',
      'description': 'Nagasaki kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.7055617669109853',
      'description': 'Nagasaki biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.10298422366265969',
      'description': 'Nagasaki park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5822628664320224',
      'description': 'Nagasaki street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.34999106259791235',
      'description': 'Nagasaki street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.04183679616489422',
      'description': 'Nagasaki street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.4750736263878872',
      'description': 'Nagasaki parliament building'
    }]
  },
  'base_price': 1000,
  'is_favorite': false,
  'offers': []
}, {
  'id': '15',
  'type': 'check-in',
  'date_from': '2024-10-17T06:53:14.541Z',
  'date_to': '2024-10-17T19:44:17.912Z',
  'destination': {
    'name': 'Chamonix',
    'description': 'Chamonix, with a beautiful old town, middle-eastern paradise, full of of cozy canteens where you can try the best coffee in the Middle East, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.5711867561979229',
      'description': 'Chamonix embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.8983546731433512',
      'description': 'Chamonix kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5976478941045429',
      'description': 'Chamonix zoo'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.2784063086886184',
      'description': 'Chamonix street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.9363330260668687',
      'description': 'Chamonix street market'
    }]
  },
  'base_price': 600,
  'is_favorite': true,
  'offers': [2, 3]
}, {
  'id': '16',
  'type': 'taxi',
  'date_from': '2024-10-17T19:44:17.912Z',
  'date_to': '2024-10-18T11:46:41.115Z',
  'destination': {
    'name': 'Amsterdam',
    'description': 'Amsterdam, is a beautiful city, with crowded streets, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.9218486891568785',
      'description': 'Amsterdam embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.2711634610605762',
      'description': 'Amsterdam street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.3092379724306282',
      'description': 'Amsterdam zoo'
    }]
  },
  'base_price': 1000,
  'is_favorite': true,
  'offers': [1, 2, 5]
}, {
  'id': '17',
  'type': 'restaurant',
  'date_from': '2024-10-18T11:46:41.115Z',
  'date_to': '2024-10-18T22:06:13.320Z',
  'destination': {
    'name': 'Frankfurt',
    'description': 'Frankfurt, is a beautiful city, a true asian pearl, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.8535535013034945',
      'description': 'Frankfurt kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.51547717812373',
      'description': 'Frankfurt kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.49159591279516635',
      'description': 'Frankfurt biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.23729356099915488',
      'description': 'Frankfurt city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.27595144173393193',
      'description': 'Frankfurt embankment'
    }]
  },
  'base_price': 400,
  'is_favorite': false,
  'offers': [1, 2]
}, {
  'id': '18',
  'type': 'train',
  'date_from': '2024-10-18T22:06:13.320Z',
  'date_to': '2024-10-19T16:55:33.325Z',
  'destination': {
    'name': 'Hiroshima',
    'description': 'Hiroshima, is a beautiful city, a true asian pearl, in a middle of Europe, full of of cozy canteens where you can try the best coffee in the Middle East.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.6517043053242586',
      'description': 'Hiroshima street market'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.07314962724690921',
      'description': 'Hiroshima embankment'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.37367655250415766',
      'description': 'Hiroshima biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.1141821917770105',
      'description': 'Hiroshima city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.12174642631196475',
      'description': 'Hiroshima park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.4297523532256544',
      'description': 'Hiroshima park'
    }]
  },
  'base_price': 900,
  'is_favorite': false,
  'offers': [1, 2, 3]
}, {
  'id': '19',
  'type': 'ship',
  'date_from': '2024-10-19T16:55:33.325Z',
  'date_to': '2024-10-20T01:16:55.275Z',
  'destination': {
    'name': 'Rome',
    'description': 'Rome, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.',
    'pictures': [{
      'src': 'http://picsum.photos/300/200?r=0.18335145588107005',
      'description': 'Rome biggest supermarket'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.961827297213611',
      'description': 'Rome kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.5323409865801327',
      'description': 'Rome kindergarten'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.17842629293228218',
      'description': 'Rome city centre'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.47773173995694584',
      'description': 'Rome park'
    }, {
      'src': 'http://picsum.photos/300/200?r=0.6150942570284761',
      'description': 'Rome parliament building'
    }]
  },
  'base_price': 300,
  'is_favorite': true,
  'offers': [5, 6]
}];

// export const TRIP_EVENTS = [];
