// ----------------------------------------------------//
// Se crean las instancias de las librerias a utilizar //
// ----------------------------------------------------//
var modbus = require('jsmodbus');
var fs = require('fs');
var httpClient = require('node-rest-client').Client;
var clientHttp = new httpClient();

//Asignar host, puerto y otros par ametros al cliente Modbus
var client = modbus.client.tcp.complete({
  'host': "192.168.20.13",
  'port': 502,
  'autoReconnect': true,
  'timeout': 60000,
  'logEnabled': true,
  'reconnectTimeout': 30000
}).connect();
////-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var intId, timeStop = 40,
  flagONS1 = 0,
  flagONS2 = 0,
  flagONS3 = 0,
  flagONS4 = 0,
  flagONS5 = 0,
  flagONS6 = 0,
  flagONS7 = 0,
  flagONS8 = 0,
  flagONS9 = 0,
  flagONS10 = 0,
  flagONS11 = 0,
  flagONS12 = 0,
  flagONS13 = 0;
var BottleSorter, ctBottleSorter = 0,
  speedTempBottleSorter = 0,
  secBottleSorter = 0,
  stopCountBottleSorter = 0,
  flagStopBottleSorter = 0,
  flagPrintBottleSorter = 0,
  speedBottleSorter = 0,
  timeBottleSorter = 0,
  actualBottleSorter = 0,
  stateBottleSorter = 0;
var FillerCapper, ctFillerCapper = 0,
  speedTempFillerCapper = 0,
  secFillerCapper = 0,
  stopCountFillerCapper = 0,
  flagStopFillerCapper = 0,
  flagPrintFillerCapper = 0,
  speedFillerCapper = 0,
  timeFillerCapper = 0,
  actualFillerCapper = 0,
  stateFillerCapper = 0;
var CapSorter, ctCapSorter = 0,
  speedTempCapSorter = 0,
  secCapSorter = 0,
  stopCountCapSorter = 0,
  flagStopCapSorter = 0,
  flagPrintCapSorter = 0,
  speedCapSorter = 0,
  timeCapSorter = 0,
  actualCapSorter = 0,
  stateCapSorter = 0;
var PumpSorter, ctPumpSorter = 0,
  speedTempPumpSorter = 0,
  secPumpSorter = 0,
  stopCountPumpSorter = 0,
  flagStopPumpSorter = 0,
  flagPrintPumpSorter = 0,
  speedPumpSorter = 0,
  timePumpSorter = 0,
  actualPumpSorter = 0,
  statePumpSorter = 0;
var BottleOrientator, ctBottleOrientator = 0,
  speedTempBottleOrientator = 0,
  secBottleOrientator = 0,
  stopCountBottleOrientator = 0,
  flagStopBottleOrientator = 0,
  flagPrintBottleOrientator = 0,
  speedBottleOrientator = 0,
  timeBottleOrientator = 0,
  actualBottleOrientator = 0,
  stateBottleOrientator = 0;
var Depuck, ctDepuck = 0,
  speedTempDepuck = 0,
  secDepuck = 0,
  stopCountDepuck = 0,
  flagStopDepuck = 0,
  flagPrintDepuck = 0,
  speedDepuck = 0,
  timeDepuck = 0,
  actualDepuck = 0,
  stateDepuck = 0;
var Labeller, ctLabeller = 0,
  speedTempLabeller = 0,
  secLabeller = 0,
  stopCountLabeller = 0,
  flagStopLabeller = 0,
  flagPrintLabeller = 0,
  speedLabeller = 0,
  timeLabeller = 0,
  actualLabeller = 0,
  stateLabeller = 0;
var Schrinkwrapper, ctSchrinkwrapper = 0,
  speedTempSchrinkwrapper = 0,
  secSchrinkwrapper = 0,
  stopCountSchrinkwrapper = 0,
  flagStopSchrinkwrapper = 0,
  flagPrintSchrinkwrapper = 0,
  speedSchrinkwrapper = 0,
  timeSchrinkwrapper = 0,
  actualSchrinkwrapper = 0,
  stateSchrinkwrapper = 0;
var CasePacker, ctCasePacker = 0,
  speedTempCasePacker = 0,
  secCasePacker = 0,
  stopCountCasePacker = 0,
  flagStopCasePacker = 0,
  flagPrintCasePacker = 0,
  speedCasePacker = 0,
  timeCasePacker = 0,
  actualCasePacker = 0,
  stateCasePacker = 0;
var Printer, ctPrinter = 0,
  speedTempPrinter = 0,
  secPrinter = 0,
  stopCountPrinter = 0,
  flagStopPrinter = 0,
  flagPrintPrinter = 0,
  speedPrinter = 0,
  timePrinter = 0,
  actualPrinter = 0,
  statePrinter = 0;
var Taper, ctTaper = 0,
  speedTempTaper = 0,
  secTaper = 0,
  stopCountTaper = 0,
  flagStopTaper = 0,
  flagPrintTaper = 0,
  speedTaper = 0,
  timeTaper = 0,
  actualTaper = 0,
  stateTaper = 0;
var CheckWeigher, ctCheckWeigher = 0,
  speedTempCheckWeigher = 0,
  secCheckWeigher = 0,
  stopCountCheckWeigher = 0,
  flagStopCheckWeigher = 0,
  flagPrintCheckWeigher = 0,
  speedCheckWeigher = 0,
  timeCheckWeigher = 0,
  actualCheckWeigher = 0,
  stateCheckWeigher = 0;
var Palletizer, ctPalletizer = 0,
  speedTempPalletizer = 0,
  secPalletizer = 0,
  stopCountPalletizer = 0,
  flagStopPalletizer = 0,
  flagPrintPalletizer = 0,
  speedPalletizer = 0,
  timePalletizer = 0,
  actualPalletizer = 0,
  statePalletizer = 0;
var barcode, secBarcode = 0;
var secEOL = 0,
  secPubNub = 5 * 60;
var publishConfig;

var files = fs.readdirSync("/home/oee/Pulse/BYD_L55_LOGS/"); //Leer documentos
var actualdate = Date.now(); //Fecha actual
var text2send = []; //Vector a enviar
var flagInfo2Send = 0;
var i = 0;

// --------------------------------------------------------- //
//Función que realiza las instrucciones de lectura de datos  //
// --------------------------------------------------------- //
var DoRead = function() {
  client.readHoldingRegisters(0, 99).then(function(resp) {
    var statesBottleSorter = switchData(resp.register[0], resp.register[1]),
      statesFillerCapper = switchData(resp.register[2], resp.register[3]),
      statesCapSorter = switchData(resp.register[4], resp.register[5]),
      statesPumpSorter = switchData(resp.register[6], resp.register[7]),
      statesBottleOrientator = switchData(resp.register[8], resp.register[9]),
      statesDepuck = switchData(resp.register[10], resp.register[11]),
      statesLabeller = switchData(resp.register[12], resp.register[13]),
      statesSchrinkwrapper = switchData(resp.register[14], resp.register[15]),
      statesCasePacker = switchData(resp.register[16], resp.register[17]),
      statesPrinter = switchData(resp.register[18], resp.register[19]),
      statesCheckWeigher = switchData(resp.register[20], resp.register[21]),
      statesTaper = switchData(resp.register[10], resp.register[11]),
      statesPalletizer = switchData(resp.register[18], resp.register[19]);
    //barcode                   = joinWord(resp.register[71],resp.register[70]);


    //Barcode -------------------------------------------------------------------------------------------------------------
    if (resp.register[70] === 0 && resp.register[71] === 0 && resp.register[72] === 0 && resp.register[73] === 0 && resp.register[74] === 0 && resp.register[75] === 0 && resp.register[76] === 0) {
      barcode = '0';
    } else {
      var dig1 = hex2a(assignment(resp.register[70]).toString(16));
      var dig2 = hex2a(assignment(resp.register[71]).toString(16));
      var dig3 = hex2a(assignment(resp.register[72]).toString(16));
      var dig4 = hex2a(assignment(resp.register[73]).toString(16));
      var dig5 = hex2a(assignment(resp.register[74]).toString(16));
      var dig6 = hex2a(assignment(resp.register[75]).toString(16));
      var dig7 = hex2a(assignment(resp.register[76]).toString(16));
      barcode = dig1 + dig2 + dig3 + dig4 + dig5 + dig6 + dig7;
    }
    if (isNaN(barcode)) {
      barcode = '0';
    }
    if (secBarcode >= 60) {
      writedataBarcode(barcode, "pol_byd_barcode_l55.log");
      secBarcode = 0;
    }
    secBarcode++;
    //Barcode -------------------------------------------------------------------------------------------------------------
    //Palletizer -------------------------------------------------------------------------------------------------------------
    ctPalletizer = joinWord(resp.register[69], resp.register[68]);
    if (flagONS13 === 0) {
      speedTempPalletizer = ctPalletizer;
      flagONS13 = 1;
    }
    if (secPalletizer >= 60) {
      if (stopCountPalletizer === 0 || flagStopPalletizer == 1) {
        flagPrintPalletizer = 1;
        secPalletizer = 0;
        speedPalletizer = ctPalletizer - speedTempPalletizer;
        speedTempPalletizer = ctPalletizer;
      }
      if (flagStopPalletizer == 1) {
        timePalletizer = Date.now();
      }
    }
    secPalletizer++;
    if (ctPalletizer > actualPalletizer) {
      statePalletizer = 1; //RUN
      if (stopCountPalletizer >= timeStop) {
        speedPalletizer = 0;
        secPalletizer = 0;
      }
      timePalletizer = Date.now();
      stopCountPalletizer = 0;
      flagStopPalletizer = 0;


    } else if (ctPalletizer == actualPalletizer) {
      if (stopCountPalletizer === 0) {
        timePalletizer = Date.now();
      }
      stopCountPalletizer++;
      if (stopCountPalletizer >= timeStop) {
        statePalletizer = 2; //STOP
        speedPalletizer = 0;
        if (flagStopPalletizer === 0) {
          flagPrintPalletizer = 1;
          ////console.log(statePalletizer);
          secPalletizer = 0;
        }
        flagStopPalletizer = 1;
      }
    }
    if (statePalletizer == 2) {
      speedTempPalletizer = ctPalletizer;
    }

    actualPalletizer = ctPalletizer;
    if (statePalletizer == 2) {
      if (statesPalletizer[5] == 1) {
        statePalletizer = 3; //Wait
      } else {
        if (statesPalletizer[4] == 1) {
          statePalletizer = 4; //Block
        }
      }
    }
    Palletizer = {
      ST: statePalletizer,
      CPQI: joinWord(resp.register[69], resp.register[68]),
      SP: speedPalletizer
    };
    if (flagPrintPalletizer == 1) {
      for (var key in Palletizer) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Palletizer_l55.log", "tt=" + timePalletizer + ",var=" + key + ",val=" + Palletizer[key] + "\n");
      }
      flagPrintPalletizer = 0;
    }
    //Palletizer -------------------------------------------------------------------------------------------------------------
    //CheckWeigher -------------------------------------------------------------------------------------------------------------
    ctCheckWeigher = joinWord(resp.register[65], resp.register[64]);
    if (flagONS12 === 0) {
      speedTempCheckWeigher = ctCheckWeigher;
      flagONS12 = 1;
    }
    if (secCheckWeigher >= 60) {
      if (stopCountCheckWeigher === 0 || flagStopCheckWeigher == 1) {
        flagPrintCheckWeigher = 1;
        secCheckWeigher = 0;
        speedCheckWeigher = ctCheckWeigher - speedTempCheckWeigher;
        speedTempCheckWeigher = ctCheckWeigher;
      }
      if (flagStopCheckWeigher == 1) {
        timeCheckWeigher = Date.now();
      }
    }
    secCheckWeigher++;
    if (ctCheckWeigher > actualCheckWeigher) {
      stateCheckWeigher = 1; //RUN
      if (stopCountCheckWeigher >= timeStop) {
        speedCheckWeigher = 0;
        secCheckWeigher = 0;
      }
      timeCheckWeigher = Date.now();
      stopCountCheckWeigher = 0;
      flagStopCheckWeigher = 0;


    } else if (ctCheckWeigher == actualCheckWeigher) {
      if (stopCountCheckWeigher === 0) {
        timeCheckWeigher = Date.now();
      }
      stopCountCheckWeigher++;
      if (stopCountCheckWeigher >= timeStop) {
        stateCheckWeigher = 2; //STOP
        speedCheckWeigher = 0;
        if (flagStopCheckWeigher === 0) {
          flagPrintCheckWeigher = 1;
          ////console.log(stateCheckWeigher);
          secCheckWeigher = 0;
        }
        flagStopCheckWeigher = 1;
      }
    }
    if (stateCheckWeigher == 2) {
      speedTempCheckWeigher = ctCheckWeigher;
    }

    actualCheckWeigher = ctCheckWeigher;
    if (stateCheckWeigher == 2) {
      if (statesCheckWeigher[5] == 1) {
        stateCheckWeigher = 3; //Wait
      } else {
        if (statesCheckWeigher[4] == 1) {
          stateCheckWeigher = 4; //Block
        }
      }
    }
    CheckWeigher = {
      ST: stateCheckWeigher,
      CPQI: joinWord(resp.register[63], resp.register[62]),
      CPQO: joinWord(resp.register[65], resp.register[64]),
      CPQR: joinWord(resp.register[67], resp.register[66]),
      SP: speedCheckWeigher
    };
    if (flagPrintCheckWeigher == 1) {
      for (var key in CheckWeigher) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_CheckWeigher_l55.log", "tt=" + timeCheckWeigher + ",var=" + key + ",val=" + CheckWeigher[key] + "\n");
      }
      flagPrintCheckWeigher = 0;
    }
    //CheckWeigher -------------------------------------------------------------------------------------------------------------
    //Taper -------------------------------------------------------------------------------------------------------------
    ctTaper = joinWord(resp.register[55], resp.register[54]);
    if (flagONS11 === 0) {
      speedTempTaper = ctTaper;
      flagONS11 = 1;
    }
    if (secTaper >= 60) {
      if (stopCountTaper === 0 || flagStopTaper == 1) {
        flagPrintTaper = 1;
        secTaper = 0;
        speedTaper = ctTaper - speedTempTaper;
        speedTempTaper = ctTaper;
      }
      if (flagStopTaper == 1) {
        timeTaper = Date.now();
      }
    }
    secTaper++;
    if (ctTaper > actualTaper) {
      stateTaper = 1; //RUN
      if (stopCountTaper >= timeStop) {
        speedTaper = 0;
        secTaper = 0;
      }
      timeTaper = Date.now();
      stopCountTaper = 0;
      flagStopTaper = 0;


    } else if (ctTaper == actualTaper) {
      if (stopCountTaper === 0) {
        timeTaper = Date.now();
      }
      stopCountTaper++;
      if (stopCountTaper >= timeStop) {
        stateTaper = 2; //STOP
        speedTaper = 0;
        if (flagStopTaper === 0) {
          flagPrintTaper = 1;
          ////console.log(stateTaper);
          secTaper = 0;
        }
        flagStopTaper = 1;
      }
    }
    if (stateTaper == 2) {
      speedTempTaper = ctTaper;
    }

    actualTaper = ctTaper;
    if (stateTaper == 2) {
      if (statesTaper[5] == 1) {
        stateTaper = 3; //Wait
      } else {
        if (statesTaper[4] == 1) {
          stateTaper = 4; //Block
        }
      }
    }
    Taper = {
      ST: stateTaper,
      CPQO: joinWord(resp.register[55], resp.register[54]),
      SP: speedTaper
    };
    if (flagPrintTaper == 1) {
      for (var key in Taper) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Taper_l55.log", "tt=" + timeTaper + ",var=" + key + ",val=" + Taper[key] + "\n");
      }
      flagPrintTaper = 0;
    }
    //Taper -------------------------------------------------------------------------------------------------------------
    //Printer -------------------------------------------------------------------------------------------------------------
    ctPrinter = joinWord(resp.register[59], resp.register[58]);
    if (flagONS10 === 0) {
      speedTempPrinter = ctPrinter;
      flagONS10 = 1;
    }
    if (secPrinter >= 60) {
      if (stopCountPrinter === 0 || flagStopPrinter == 1) {
        flagPrintPrinter = 1;
        secPrinter = 0;
        speedPrinter = ctPrinter - speedTempPrinter;
        speedTempPrinter = ctPrinter;
      }
      if (flagStopPrinter == 1) {
        timePrinter = Date.now();
      }
    }
    secPrinter++;
    if (ctPrinter > actualPrinter) {
      statePrinter = 1; //RUN
      if (stopCountPrinter >= timeStop) {
        speedPrinter = 0;
        secPrinter = 0;
      }
      timePrinter = Date.now();
      stopCountPrinter = 0;
      flagStopPrinter = 0;


    } else if (ctPrinter == actualPrinter) {
      if (stopCountPrinter === 0) {
        timePrinter = Date.now();
      }
      stopCountPrinter++;
      if (stopCountPrinter >= timeStop) {
        statePrinter = 2; //STOP
        speedPrinter = 0;
        if (flagStopPrinter === 0) {
          flagPrintPrinter = 1;
          ////console.log(statePrinter);
          secPrinter = 0;
        }
        flagStopPrinter = 1;
      }
    }
    if (statePrinter == 2) {
      speedTempPrinter = ctPrinter;
    }

    actualPrinter = ctPrinter;
    if (statePrinter == 2) {
      if (statesPrinter[5] == 1) {
        statePrinter = 3; //Wait
      } else {
        if (statesPrinter[4] == 1) {
          statePrinter = 4; //Block
        }
      }
    }
    Printer = {
      ST: statePrinter,
      CPQI: joinWord(resp.register[57], resp.register[56]),
      CPQO: joinWord(resp.register[59], resp.register[58]),
      CPQR: joinWord(resp.register[61], resp.register[60]),
      SP: speedPrinter
    };
    if (flagPrintPrinter == 1) {
      for (var key in Printer) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Printer_l55.log", "tt=" + timePrinter + ",var=" + key + ",val=" + Printer[key] + "\n");
      }
      flagPrintPrinter = 0;
    }
    //Printer -------------------------------------------------------------------------------------------------------------
    //CasePacker -------------------------------------------------------------------------------------------------------------
    ctCasePacker = joinWord(resp.register[53], resp.register[52]);
    if (flagONS9 === 0) {
      speedTempCasePacker = ctCasePacker;
      flagONS9 = 1;
    }
    if (secCasePacker >= 60) {
      if (stopCountCasePacker === 0 || flagStopCasePacker == 1) {
        flagPrintCasePacker = 1;
        secCasePacker = 0;
        speedCasePacker = ctCasePacker - speedTempCasePacker;
        speedTempCasePacker = ctCasePacker;
      }
      if (flagStopCasePacker == 1) {
        timeCasePacker = Date.now();
      }
    }
    secCasePacker++;
    if (ctCasePacker > actualCasePacker) {
      stateCasePacker = 1; //RUN
      if (stopCountCasePacker >= timeStop) {
        speedCasePacker = 0;
        secCasePacker = 0;
      }
      timeCasePacker = Date.now();
      stopCountCasePacker = 0;
      flagStopCasePacker = 0;


    } else if (ctCasePacker == actualCasePacker) {
      if (stopCountCasePacker === 0) {
        timeCasePacker = Date.now();
      }
      stopCountCasePacker++;
      if (stopCountCasePacker >= timeStop) {
        stateCasePacker = 2; //STOP
        speedCasePacker = 0;
        if (flagStopCasePacker === 0) {
          flagPrintCasePacker = 1;
          ////console.log(stateCasePacker);
          secCasePacker = 0;
        }
        flagStopCasePacker = 1;
      }
    }
    if (stateCasePacker == 2) {
      speedTempCasePacker = ctCasePacker;
    }

    actualCasePacker = ctCasePacker;
    if (stateCasePacker == 2) {
      if (statesCasePacker[5] == 1) {
        stateCasePacker = 3; //Wait
      } else {
        if (statesCasePacker[4] == 1) {
          stateCasePacker = 4; //Block
        }
      }
    }
    CasePacker = {
      ST: stateCasePacker,
      CPQI: joinWord(resp.register[51], resp.register[50]),
      CPQO: joinWord(resp.register[53], resp.register[52]),
      SP: speedCasePacker
    };
    if (flagPrintCasePacker == 1) {
      for (var key in CasePacker) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_CasePacker_l55.log", "tt=" + timeCasePacker + ",var=" + key + ",val=" + CasePacker[key] + "\n");
      }
      flagPrintCasePacker = 0;
    }
    //CasePacker -------------------------------------------------------------------------------------------------------------
    //Schrinkwrapper -------------------------------------------------------------------------------------------------------------
    ctSchrinkwrapper = joinWord(resp.register[49], resp.register[48]);
    if (flagONS8 === 0) {
      speedTempSchrinkwrapper = ctSchrinkwrapper;
      flagONS8 = 1;
    }
    if (secSchrinkwrapper >= 60) {
      if (stopCountSchrinkwrapper === 0 || flagStopSchrinkwrapper == 1) {
        flagPrintSchrinkwrapper = 1;
        secSchrinkwrapper = 0;
        speedSchrinkwrapper = ctSchrinkwrapper - speedTempSchrinkwrapper;
        speedTempSchrinkwrapper = ctSchrinkwrapper;
      }
      if (flagStopSchrinkwrapper == 1) {
        timeSchrinkwrapper = Date.now();
      }
    }
    secSchrinkwrapper++;
    if (ctSchrinkwrapper > actualSchrinkwrapper) {
      stateSchrinkwrapper = 1; //RUN
      if (stopCountSchrinkwrapper >= timeStop) {
        speedSchrinkwrapper = 0;
        secSchrinkwrapper = 0;
      }
      timeSchrinkwrapper = Date.now();
      stopCountSchrinkwrapper = 0;
      flagStopSchrinkwrapper = 0;


    } else if (ctSchrinkwrapper == actualSchrinkwrapper) {
      if (stopCountSchrinkwrapper === 0) {
        timeSchrinkwrapper = Date.now();
      }
      stopCountSchrinkwrapper++;
      if (stopCountSchrinkwrapper >= timeStop) {
        stateSchrinkwrapper = 2; //STOP
        speedSchrinkwrapper = 0;
        if (flagStopSchrinkwrapper === 0) {
          flagPrintSchrinkwrapper = 1;
          ////console.log(stateSchrinkwrapper);
          secSchrinkwrapper = 0;
        }
        flagStopSchrinkwrapper = 1;
      }
    }
    if (stateSchrinkwrapper == 2) {
      speedTempSchrinkwrapper = ctSchrinkwrapper;
    }

    actualSchrinkwrapper = ctSchrinkwrapper;
    if (stateSchrinkwrapper == 2) {
      if (statesSchrinkwrapper[5] == 1) {
        stateSchrinkwrapper = 3; //Wait
      } else {
        if (statesSchrinkwrapper[4] == 1) {
          stateSchrinkwrapper = 4; //Block
        }
      }
    }
    Schrinkwrapper = {
      ST: stateSchrinkwrapper,
      CPQI: joinWord(resp.register[47], resp.register[46]),
      CPQO: joinWord(resp.register[49], resp.register[48]),
      SP: speedSchrinkwrapper
    };
    if (flagPrintSchrinkwrapper == 1) {
      for (var key in Schrinkwrapper) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Schrinkwrapper_l55.log", "tt=" + timeSchrinkwrapper + ",var=" + key + ",val=" + Schrinkwrapper[key] + "\n");
      }
      flagPrintSchrinkwrapper = 0;
    }
    //Schrinkwrapper -------------------------------------------------------------------------------------------------------------
    //Labeller -------------------------------------------------------------------------------------------------------------
    ctLabeller = joinWord(resp.register[43], resp.register[42]);
    if (flagONS7 === 0) {
      speedTempLabeller = ctLabeller;
      flagONS7 = 1;
    }
    if (secLabeller >= 60) {
      if (stopCountLabeller === 0 || flagStopLabeller == 1) {
        flagPrintLabeller = 1;
        secLabeller = 0;
        speedLabeller = ctLabeller - speedTempLabeller;
        speedTempLabeller = ctLabeller;
      }
      if (flagStopLabeller == 1) {
        timeLabeller = Date.now();
      }
    }
    secLabeller++;
    if (ctLabeller > actualLabeller) {
      stateLabeller = 1; //RUN
      if (stopCountLabeller >= timeStop) {
        speedLabeller = 0;
        secLabeller = 0;
      }
      timeLabeller = Date.now();
      stopCountLabeller = 0;
      flagStopLabeller = 0;


    } else if (ctLabeller == actualLabeller) {
      if (stopCountLabeller === 0) {
        timeLabeller = Date.now();
      }
      stopCountLabeller++;
      if (stopCountLabeller >= timeStop) {
        stateLabeller = 2; //STOP
        speedLabeller = 0;
        if (flagStopLabeller === 0) {
          flagPrintLabeller = 1;
          ////console.log(stateLabeller);
          secLabeller = 0;
        }
        flagStopLabeller = 1;
      }
    }
    if (stateLabeller == 2) {
      speedTempLabeller = ctLabeller;
    }

    actualLabeller = ctLabeller;
    if (stateLabeller == 2) {
      if (statesLabeller[5] == 1) {
        stateLabeller = 3; //Wait
      } else {
        if (statesLabeller[4] == 1) {
          stateLabeller = 4; //Block
        }
      }
    }
    Labeller = {
      ST: stateLabeller,
      CPQI: joinWord(resp.register[41], resp.register[40]),
      CPQO: joinWord(resp.register[43], resp.register[42]),
      CPQR: joinWord(resp.register[45], resp.register[44]),
      SP: speedLabeller
    };
    if (flagPrintLabeller == 1) {
      for (var key in Labeller) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Labeller_l55.log", "tt=" + timeLabeller + ",var=" + key + ",val=" + Labeller[key] + "\n");
      }
      flagPrintLabeller = 0;
    }
    //Labeller -------------------------------------------------------------------------------------------------------------
    //Depuck -------------------------------------------------------------------------------------------------------------
    ctDepuck = joinWord(resp.register[39], resp.register[38]);
    if (flagONS6 === 0) {
      speedTempDepuck = ctDepuck;
      flagONS6 = 1;
    }
    if (secDepuck >= 60) {
      if (stopCountDepuck === 0 || flagStopDepuck == 1) {
        flagPrintDepuck = 1;
        secDepuck = 0;
        speedDepuck = ctDepuck - speedTempDepuck;
        speedTempDepuck = ctDepuck;
      }
      if (flagStopDepuck == 1) {
        timeDepuck = Date.now();
      }
    }
    secDepuck++;
    if (ctDepuck > actualDepuck) {
      stateDepuck = 1; //RUN
      if (stopCountDepuck >= timeStop) {
        speedDepuck = 0;
        secDepuck = 0;
      }
      timeDepuck = Date.now();
      stopCountDepuck = 0;
      flagStopDepuck = 0;


    } else if (ctDepuck == actualDepuck) {
      if (stopCountDepuck === 0) {
        timeDepuck = Date.now();
      }
      stopCountDepuck++;
      if (stopCountDepuck >= timeStop) {
        stateDepuck = 2; //STOP
        speedDepuck = 0;
        if (flagStopDepuck === 0) {
          flagPrintDepuck = 1;
          ////console.log(stateDepuck);
          secDepuck = 0;
        }
        flagStopDepuck = 1;
      }
    }
    if (stateDepuck == 2) {
      speedTempDepuck = ctDepuck;
    }

    actualDepuck = ctDepuck;
    if (stateDepuck == 2) {
      if (statesDepuck[5] == 1) {
        stateDepuck = 3; //Wait
      } else {
        if (statesDepuck[4] == 1) {
          stateDepuck = 4; //Block
        }
      }
    }
    Depuck = {
      ST: stateDepuck,
      CPQO: joinWord(resp.register[39], resp.register[38]),
      SP: speedDepuck
    };
    if (flagPrintDepuck == 1) {
      for (var key in Depuck) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_Depuck_l55.log", "tt=" + timeDepuck + ",var=" + key + ",val=" + Depuck[key] + "\n");
      }
      flagPrintDepuck = 0;
    }
    //Depuck -------------------------------------------------------------------------------------------------------------
    //BottleOrientator -------------------------------------------------------------------------------------------------------------
    ctBottleOrientator = joinWord(resp.register[37], resp.register[36]);
    if (flagONS5 === 0) {
      speedTempBottleOrientator = ctBottleOrientator;
      flagONS5 = 1;
    }
    if (secBottleOrientator >= 60) {
      if (stopCountBottleOrientator === 0 || flagStopBottleOrientator == 1) {
        flagPrintBottleOrientator = 1;
        secBottleOrientator = 0;
        speedBottleOrientator = ctBottleOrientator - speedTempBottleOrientator;
        speedTempBottleOrientator = ctBottleOrientator;
      }
      if (flagStopBottleOrientator == 1) {
        timeBottleOrientator = Date.now();
      }
    }
    secBottleOrientator++;
    if (ctBottleOrientator > actualBottleOrientator) {
      stateBottleOrientator = 1; //RUN
      if (stopCountBottleOrientator >= timeStop) {
        speedBottleOrientator = 0;
        secBottleOrientator = 0;
      }
      timeBottleOrientator = Date.now();
      stopCountBottleOrientator = 0;
      flagStopBottleOrientator = 0;


    } else if (ctBottleOrientator == actualBottleOrientator) {
      if (stopCountBottleOrientator === 0) {
        timeBottleOrientator = Date.now();
      }
      stopCountBottleOrientator++;
      if (stopCountBottleOrientator >= timeStop) {
        stateBottleOrientator = 2; //STOP
        speedBottleOrientator = 0;
        if (flagStopBottleOrientator === 0) {
          flagPrintBottleOrientator = 1;
          ////console.log(stateBottleOrientator);
          secBottleOrientator = 0;
        }
        flagStopBottleOrientator = 1;
      }
    }
    if (stateBottleOrientator == 2) {
      speedTempBottleOrientator = ctBottleOrientator;
    }

    actualBottleOrientator = ctBottleOrientator;
    if (stateBottleOrientator == 2) {
      if (statesBottleOrientator[5] == 1) {
        stateBottleOrientator = 3; //Wait
      } else {
        if (statesBottleOrientator[4] == 1) {
          stateBottleOrientator = 4; //Block
        }
      }
    }
    BottleOrientator = {
      ST: stateBottleOrientator,
      CPQO: joinWord(resp.register[37], resp.register[36]),
      SP: speedBottleOrientator
    };
    if (flagPrintBottleOrientator == 1) {
      for (var key in BottleOrientator) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_BottleOrientator_l55.log", "tt=" + timeBottleOrientator + ",var=" + key + ",val=" + BottleOrientator[key] + "\n");
      }
      flagPrintBottleOrientator = 0;
    }
    //BottleOrientator -------------------------------------------------------------------------------------------------------------
    //BottleSorter -------------------------------------------------------------------------------------------------------------
    ctBottleSorter = joinWord(resp.register[23], resp.register[22]);
    if (flagONS1 === 0) {
      speedTempBottleSorter = ctBottleSorter;
      flagONS1 = 1;
    }
    if (secBottleSorter >= 60) {
      if (stopCountBottleSorter === 0 || flagStopBottleSorter == 1) {
        flagPrintBottleSorter = 1;
        secBottleSorter = 0;
        speedBottleSorter = ctBottleSorter - speedTempBottleSorter;
        speedTempBottleSorter = ctBottleSorter;
      }
      if (flagStopBottleSorter == 1) {
        timeBottleSorter = Date.now();
      }
    }
    secBottleSorter++;
    if (ctBottleSorter > actualBottleSorter) {
      stateBottleSorter = 1; //RUN
      if (stopCountBottleSorter >= timeStop) {
        speedBottleSorter = 0;
        secBottleSorter = 0;
      }
      timeBottleSorter = Date.now();
      stopCountBottleSorter = 0;
      flagStopBottleSorter = 0;


    } else if (ctBottleSorter == actualBottleSorter) {
      if (stopCountBottleSorter === 0) {
        timeBottleSorter = Date.now();
      }
      stopCountBottleSorter++;
      if (stopCountBottleSorter >= timeStop) {
        stateBottleSorter = 2; //STOP
        speedBottleSorter = 0;
        if (flagStopBottleSorter === 0) {
          flagPrintBottleSorter = 1;
          ////console.log(stateBottleSorter);
          secBottleSorter = 0;
        }
        flagStopBottleSorter = 1;
      }
    }
    if (stateBottleSorter == 2) {
      speedTempBottleSorter = ctBottleSorter;
    }

    actualBottleSorter = ctBottleSorter;
    if (stateBottleSorter == 2) {
      if (statesBottleSorter[5] == 1) {
        stateBottleSorter = 3; //Wait
      } else {
        if (statesBottleSorter[4] == 1) {
          stateBottleSorter = 4; //Block
        }
      }
    }
    BottleSorter = {
      ST: stateBottleSorter,
      CPQO: joinWord(resp.register[23], resp.register[22]),
      CPQR: joinWord(resp.register[25], resp.register[24]),
      SP: speedBottleSorter
    };
    if (flagPrintBottleSorter == 1) {
      for (var key in BottleSorter) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_BottleSorter_l55.log", "tt=" + timeBottleSorter + ",var=" + key + ",val=" + BottleSorter[key] + "\n");
      }
      flagPrintBottleSorter = 0;
    }
    //BottleSorter -------------------------------------------------------------------------------------------------------------
    //FillerCapper -------------------------------------------------------------------------------------------------------------
    ctFillerCapper = joinWord(resp.register[29], resp.register[28]);
    if (flagONS2 === 0) {
      speedTempFillerCapper = ctFillerCapper;
      flagONS2 = 1;
    }
    if (secFillerCapper >= 60) {
      if (stopCountFillerCapper === 0 || flagStopFillerCapper == 1) {
        flagPrintFillerCapper = 1;
        secFillerCapper = 0;
        speedFillerCapper = ctFillerCapper - speedTempFillerCapper;
        speedTempFillerCapper = ctFillerCapper;
      }
      if (flagStopFillerCapper == 1) {
        timeFillerCapper = Date.now();
      }
    }
    secFillerCapper++;
    if (ctFillerCapper > actualFillerCapper) {
      stateFillerCapper = 1; //RUN
      if (stopCountFillerCapper >= timeStop) {
        speedFillerCapper = 0;
        secFillerCapper = 0;
      }
      timeFillerCapper = Date.now();
      stopCountFillerCapper = 0;
      flagStopFillerCapper = 0;


    } else if (ctFillerCapper == actualFillerCapper) {
      if (stopCountFillerCapper === 0) {
        timeFillerCapper = Date.now();
      }
      stopCountFillerCapper++;
      if (stopCountFillerCapper >= timeStop) {
        stateFillerCapper = 2; //STOP
        speedFillerCapper = 0;
        if (flagStopFillerCapper === 0) {
          flagPrintFillerCapper = 1;
          ////console.log(stateFillerCapper);
          secFillerCapper = 0;
        }
        flagStopFillerCapper = 1;
      }
    }
    if (stateFillerCapper == 2) {
      speedTempFillerCapper = ctFillerCapper;
    }

    actualFillerCapper = ctFillerCapper;
    if (stateFillerCapper == 2) {
      if (statesFillerCapper[5] == 1) {
        stateFillerCapper = 3; //Wait
      } else {
        if (statesFillerCapper[4] == 1) {
          stateFillerCapper = 4; //Block
        }
      }
    }
    FillerCapper = {
      ST: stateFillerCapper,
      CPQI: joinWord(resp.register[27], resp.register[26]),
      CPQO: joinWord(resp.register[29], resp.register[28]),
      CPQR: joinWord(resp.register[31], resp.register[30]),
      SP: speedFillerCapper
    };
    if (flagPrintFillerCapper == 1) {
      for (var key in FillerCapper) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_FillerCapper_l55.log", "tt=" + timeFillerCapper + ",var=" + key + ",val=" + FillerCapper[key] + "\n");
      }
      flagPrintFillerCapper = 0;
    }
    //FillerCapper -------------------------------------------------------------------------------------------------------------
    //CapSorter -------------------------------------------------------------------------------------------------------------
    ctCapSorter = joinWord(resp.register[33], resp.register[32]);
    if (flagONS3 === 0) {
      speedTempCapSorter = ctCapSorter;
      flagONS3 = 1;
    }
    if (secCapSorter >= 60) {
      if (stopCountCapSorter === 0 || flagStopCapSorter == 1) {
        flagPrintCapSorter = 1;
        secCapSorter = 0;
        speedCapSorter = ctCapSorter - speedTempCapSorter;
        speedTempCapSorter = ctCapSorter;
      }
      if (flagStopCapSorter == 1) {
        timeCapSorter = Date.now();
      }
    }
    secCapSorter++;
    if (ctCapSorter > actualCapSorter) {
      stateCapSorter = 1; //RUN
      if (stopCountCapSorter >= timeStop) {
        speedCapSorter = 0;
        secCapSorter = 0;
      }
      timeCapSorter = Date.now();
      stopCountCapSorter = 0;
      flagStopCapSorter = 0;


    } else if (ctCapSorter == actualCapSorter) {
      if (stopCountCapSorter === 0) {
        timeCapSorter = Date.now();
      }
      stopCountCapSorter++;
      if (stopCountCapSorter >= timeStop) {
        stateCapSorter = 2; //STOP
        speedCapSorter = 0;
        if (flagStopCapSorter === 0) {
          flagPrintCapSorter = 1;
          ////console.log(stateCapSorter);
          secCapSorter = 0;
        }
        flagStopCapSorter = 1;
      }
    }
    if (stateCapSorter == 2) {
      speedTempCapSorter = ctCapSorter;
    }

    actualCapSorter = ctCapSorter;
    if (stateCapSorter == 2) {
      if (statesCapSorter[5] == 1) {
        stateCapSorter = 3; //Wait
      } else {
        if (statesCapSorter[4] == 1) {
          stateCapSorter = 4; //Block
        }
      }
    }
    CapSorter = {
      ST: stateCapSorter,
      CPQO: joinWord(resp.register[33], resp.register[32]),
      SP: speedCapSorter
    };
    if (flagPrintCapSorter == 1) {
      for (var key in CapSorter) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_CapSorter_l55.log", "tt=" + timeCapSorter + ",var=" + key + ",val=" + CapSorter[key] + "\n");
      }
      flagPrintCapSorter = 0;
    }
    //CapSorter -------------------------------------------------------------------------------------------------------------
    //PumpSorter -------------------------------------------------------------------------------------------------------------
    ctPumpSorter = joinWord(resp.register[35], resp.register[34]);
    if (flagONS4 === 0) {
      speedTempPumpSorter = ctPumpSorter;
      flagONS4 = 1;
    }
    if (secPumpSorter >= 60) {
      if (stopCountPumpSorter === 0 || flagStopPumpSorter == 1) {
        flagPrintPumpSorter = 1;
        secPumpSorter = 0;
        speedPumpSorter = ctPumpSorter - speedTempPumpSorter;
        speedTempPumpSorter = ctPumpSorter;
      }
      if (flagStopPumpSorter == 1) {
        timePumpSorter = Date.now();
      }
    }
    secPumpSorter++;
    if (ctPumpSorter > actualPumpSorter) {
      statePumpSorter = 1; //RUN
      if (stopCountPumpSorter >= timeStop) {
        speedPumpSorter = 0;
        secPumpSorter = 0;
      }
      timePumpSorter = Date.now();
      stopCountPumpSorter = 0;
      flagStopPumpSorter = 0;


    } else if (ctPumpSorter == actualPumpSorter) {
      if (stopCountPumpSorter === 0) {
        timePumpSorter = Date.now();
      }
      stopCountPumpSorter++;
      if (stopCountPumpSorter >= timeStop) {
        statePumpSorter = 2; //STOP
        speedPumpSorter = 0;
        if (flagStopPumpSorter === 0) {
          flagPrintPumpSorter = 1;
          ////console.log(statePumpSorter);
          secPumpSorter = 0;
        }
        flagStopPumpSorter = 1;
      }
    }
    if (statePumpSorter == 2) {
      speedTempPumpSorter = ctPumpSorter;
    }

    actualPumpSorter = ctPumpSorter;
    if (statePumpSorter == 2) {
      if (statesPumpSorter[5] == 1) {
        statePumpSorter = 3; //Wait
      } else {
        if (statesPumpSorter[4] == 1) {
          statePumpSorter = 4; //Block
        }
      }
    }
    PumpSorter = {
      ST: statePumpSorter,
      CPQO: joinWord(resp.register[35], resp.register[34]),
      SP: speedPumpSorter
    };
    if (flagPrintPumpSorter == 1) {
      for (var key in PumpSorter) {
        fs.appendFileSync("../BYD_L55_LOGS/pol_byd_PumpSorter_l55.log", "tt=" + timePumpSorter + ",var=" + key + ",val=" + PumpSorter[key] + "\n");
      }
      flagPrintPumpSorter = 0;
    }
    //PumpSorter -------------------------------------------------------------------------------------------------------------
    //EOL --------------------------------------------------------------------------------------------------------------------
    if (secEOL >= 60) {
      fs.appendFileSync("../BYD_L55_LOGS/pol_byd_EOL_l55.log", "tt=" + Date.now() + ",var=EOL" + ",val=" + CheckWeigher.CPQO + "\n");
      secEOL = 0;
    }
    secEOL++;
    //EOL --------------------------------------------------------------------------------------------------------------------
    if (secPubNub >= 5 * 60) {

      function idle() {
        i = 0;
        text2send = [];
        for (k = 0; k < files.length; k++) { //Verificar los archivos
          var stats = fs.statSync("/home/oee/Pulse/BYD_L55_LOGS/" + files[k]);
          var mtime = new Date(stats.mtime).getTime();
          if (mtime < (Date.now() - (3 * 60 * 1000)) && files[k].indexOf("serialbox") == -1) {
            flagInfo2Send = 1;
            text2send[i] = files[k];
            i++;
          }
        }
      }

      idle();
      secPubNub = 0;
      publishConfig = {
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          message: {
            line: "55",
            tt: Date.now(),
            machines: text2send
          }
        }
      };
      senderData();
    }
    secPubNub++;
  }); //END Client Read
};
// registering remote methods
clientHttp.registerMethod("postMethod", "http://35.160.68.187:23000/heartbeatLine/Byd", "POST");

function senderData() {
  clientHttp.methods.postMethod(publishConfig, function(data, response) {
    // parsed response body as js object
    console.log(data.toString());
  });
}

var hex2a = function(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

var stateMachine = function(data) {
  if (data[7] == 1) {
    return 1; //RUN
  }
  if (data[6] == 1) {
    return 2; //STOP
  }
  if (data[5] == 1) {
    return 3; //WAIT
  }
  if (data[4] == 1) {
    return 4; //BLOCK
  }
  return 2;
};

var counterState = function(actual, temp) {
  if (actual != temp) {
    return 1;
  } else {
    return 2;
  }
};

var writedata = function(varJson, nameFile) {
  var data;
  var timet = Date.now();
  for (var key in varJson) {
    fs.appendFileSync("../BYD_L55_LOGS/" + nameFile, "tt=" + timet + ",var=" + key + ",val=" + varJson[key] + "\n");
  }
};
var writedataBarcode = function(barcode, nameFile) {
  var timet = Date.now();
  fs.appendFileSync("../BYD_L55_LOGS/" + nameFile, "tt=" + timet + ",var=bc" + ",val=" + barcode + "\n");
};

var joinWord = function(num1, num2) {
  var bits = "00000000000000000000000000000000";
  var bin1 = num1.toString(2),
    bin2 = num2.toString(2),
    newNum = bits.split("");

  for (var i = 0; i < bin1.length; i++) {
    newNum[31 - i] = bin1[(bin1.length - 1) - i];
  }
  for (var j = 0; j < bin2.length; j++) {
    newNum[15 - j] = bin2[(bin2.length - 1) - j];
  }
  bits = newNum.join("");
  return parseInt(bits, 2);
};
var switchData = function(num1, num2) {
  var bits = "00000000000000000000000000000000";
  var bin1 = num1.toString(2),
    bin2 = num2.toString(2),
    newNum = bits.split("");

  for (var i = 0; i < bin1.length; i++) {
    newNum[15 - i] = bin1[(bin1.length - 1) - i];
  }
  for (var j = 0; j < bin2.length; j++) {
    newNum[31 - j] = bin2[(bin2.length - 1) - j];
  }
  bits = newNum.join("");

  return bits;
};

var assignment = function(val) {
  var result;
  if (val < 4095)
    result = "";
  else
    result = val;
  return result;
};

var stop = function() {
  ///This function clean data
  clearInterval(intId);
};

var shutdown = function() {
  ///Use function STOP and close connection
  stop();
  client.close();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


///*If client is connect call a function "DoRead"*/
client.on('connect', function(err) {
  setInterval(function() {
    DoRead();
  }, 1000);
});

///*If client is in a error ejecute an acction*/
client.on('error', function(err) {
  fs.appendFileSync("error.log", "ID 1: " + Date.now() + ": " + err + "\n");
  //console.log('Client Error', err);
});
///If client try closed, this metodo try reconnect client to server
client.on('close', function() {
  //console.log('Client closed, stopping interval.');
  fs.appendFileSync("error.log", "ID 2: " + Date.now() + ": " + 'Client closed, stopping interval.' + "\n");
  stop();
});
