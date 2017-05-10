/**
 * Created by Vladyslav_Nikolaiev on 10-May-17.
 */
window.onload=()=> {

    /*table id*/
    const tableId = 'content-table';

    /*table content data*/
    const data = [];

    /*reverse flags object*/
    const reverseFlags = {};

    /*table generated rows count*/
    const rowsCount = 10;

    /*table element*/
    let table=document.getElementById(tableId);

    /*table tbody element*/
    let tableBody = table.getElementsByTagName('tbody')[0];

    /*init tableBody*/
    init();

    /*functions declarations*/

    /**
     * Initializes table
     * Bind <th> with sort functions
     */
    function init(){

        initReverseFlags();

        fulFillTable();

        bindHeaders();

        /**
         * Initialize reverse flags object
         */
        function initReverseFlags() {
            /*init reverse flags object*/
            reverseFlags.file=true;
            reverseFlags.size=true;
            reverseFlags.date=true;
        }

        /**
         * FulFull tableBody
         */
        function fulFillTable() {
            for (let index = 0; index < rowsCount; index++) {
                let row = tableBody.insertRow(0);
                data[index] = {};

                /*file name*/
                data[index].file = Math.random().toString(36).substring(7) + " " + "file name";
                let cell = row.insertCell(0);
                cell.innerHTML = "<a href='#'>" + data[index].file + '</a>';

                /*size*/
                data[index].size = Math.ceil(Math.random() * 1000);
                cell = row.insertCell(-1);
                cell.innerHTML = data[index].size;

                /*date*/
                let d = dateRandomGenerator(2,8,2);
                data[index].date = d;
                cell = row.insertCell(-1);
                cell.innerHTML = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
                    d.getHours() + ":" + d.getMinutes();

                /*remove file button*/
                cell = row.insertCell(-1);
                cell.innerHTML = "<a href='#' class='link-delete'>Удалить</a>";
            }
        }

        /**
         * Bind tableBody header to functionality
         */
        function bindHeaders() {
            //array
            let thArray=table.getElementsByTagName('th')

            for(let index=0; index<thArray.length-1;index++){
                let th=thArray[index];
                th.onclick=(e)=>{
                    sortDataByPropertyIndex(index);
                    buildTable();
                }
            }
        }

        /**
         * Generates random Date
         * @param rangeOfDays
         * @param startHour
         * @param hourRange
         * @returns {Date} Date
         */
        function dateRandomGenerator (rangeOfDays,startHour,hourRange){
            let today = new Date(Date.now());
            return new Date(today.getYear()+1900,today.getMonth(), today.getDate()+Math.random() *rangeOfDays, Math.random()*hourRange + startHour, Math.random()*60)
        }
    }


    /**
     *  Return key value by object's property index
     * @param index property index
     * @returns {string} property key
     */
    function getKeySortByPropertyIndex(index) {
        let keySort="";
        let tempIndexKey=0;

        for(let key in data[0]){
            if(tempIndexKey===index){
                //key was found
                keySort=key;
                break;
            }
            tempIndexKey++;
        }
        return keySort;
    }


    /**
     * Sorts data object by property
     * @param index <tr> element index
     */
    function sortDataByPropertyIndex(index){

        /*find key to sort*/
        let keySort=getKeySortByPropertyIndex(index)

        /*decide what sorter to use*/

        //setting sort reverse flag
        reverseFlags[keySort]=!reverseFlags[keySort];

        let isReversed=reverseFlags[keySort];

        data.sort((firstElem,secondElem)=>{

            //by size
            if(typeof firstElem[keySort] === 'number'){

                if(isReversed)
                    return parseFloat(firstElem.size)-parseFloat(secondElem.size);
                else
                    return parseFloat(secondElem.size)-parseFloat(firstElem.size);
            }

            //by file name
            if(typeof firstElem[keySort] === 'string'){
                if(isReversed)
                    return firstElem[keySort].localeCompare(secondElem[keySort]);
                else
                    return secondElem[keySort].localeCompare(firstElem[keySort]);
            }

            //we have only date
            if(typeof firstElem[keySort] === 'object'){
                if(isReversed)
                    return firstElem[keySort].getTime()-secondElem[keySort].getTime();
                else
                    return secondElem[keySort].getTime()-firstElem[keySort].getTime();
            }
        });
    }

    /**
     * Fulfills tableBody body
     */
    function buildTable() {
        clearTable();
        /*initiation*/
        for (let index = 0; index < rowsCount; index++) {
            let row = tableBody.insertRow(0);
            /*file name*/
            let cell = row.insertCell(0);
            cell.innerHTML = "<a href='#'>" + data[index].file + '</a>';

            /**/
            cell = row.insertCell(-1);
            cell.innerHTML = data[index].size;

            let d = data[index].date;

            cell = row.insertCell(-1);
            cell.innerHTML = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
                d.getHours() + ":" + d.getMinutes();

            cell = row.insertCell(-1);
            cell.innerHTML = "<a href='#' class='link-delete'>Удалить</a>";
        }
    }

    /**
     * Clears tableBody body
     */
    function clearTable(){
        tableBody.innerHTML="";
    }
};
