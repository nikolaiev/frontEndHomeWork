/**
 * Created by Vladyslav_Nikolaiev on 10-May-17.
 */
$(()=> {

    /*table id*/
    const TABLE_ID = 'content-table';

    /*table content data*/
    const DATA = [];

    /*reverse flags object*/
    const REVERSE_FLAGS = {};

    /*table generated rows count*/
    const ROWS_COUNT = 10;

    /*table element*/
    let table=$('#'+TABLE_ID);

    /*table tbody element*/
    let tableBody = $('tbody')[0];

    /*init tableBody*/
    init();

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
            REVERSE_FLAGS.file=true;
            REVERSE_FLAGS.size=true;
            REVERSE_FLAGS.date=true;
        }

        /**
         * FulFull tableBody
         */
        function fulFillTable() {
            for (let index = 0; index < ROWS_COUNT; index++) {
                DATA[index] = {};

                DATA[index].file = Math.random().toString(36).substring(7) + " " + "file name";
                DATA[index].size = Math.ceil(Math.random() * 1000);
                DATA[index].date = dateRandomGenerator(2, 8, 2);
            }

            buildTable();
        }

        /**
         * Bind tableBody header to functionality
         */
        function bindHeaders() {

            //array
            $('th:lt(3)').each((index,elem)=>{
                $(elem).click((e)=>{

                    restorePseudoElements();

                    /*find key to sort*/
                    let keySort=getKeySortByPropertyIndex(index);
                    let isReversed=REVERSE_FLAGS[keySort];

                    if(!isReversed)
                        $(e.target).removeClass().addClass('desc');
                    else
                        $(e.target).removeClass().addClass('asc');

                    sortDataByPropertyKey(keySort);
                    buildTable();
                });
            });

            /**
             * restores all th pseudo classes to default
             */
            function restorePseudoElements() {
                $('th:lt(3)').each((index,elem)=>{
                    $(elem).removeClass().addClass('none');
                });
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

        for(let key in DATA[0]){
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
     * Sorts DATA object by property
     * @param index <tr> element index
     */
    function sortDataByPropertyKey(keySort){
        /*decide what sorter to use*/

        //setting sort reverse flag
        REVERSE_FLAGS[keySort]=!REVERSE_FLAGS[keySort];

        let isReversed=REVERSE_FLAGS[keySort];

        DATA.sort((firstElem,secondElem)=>{

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
        for (let index = 0; index < ROWS_COUNT; index++) {
            let d = DATA[index].date;

            table.children().filter('tbody').append(
                $('<tr>')

                /*file name*/
                    .append(
                        $('<td>')
                            .append(
                                $('<a>')
                                    .attr('href','#')
                                    .html(DATA[index].file)
                            )
                    )
                    /*file size*/
                    .append(
                        $('<td>')
                            .append(
                                $('<a>')
                                    .attr('href','#')
                                    .html(DATA[index].size)
                            )
                    )
                    /*date and time*/
                    .append(
                        $('<td>').append(
                            $('<a>')
                                .attr('href','#')
                                .html(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
                                    d.getHours() + ":" + d.getMinutes())
                        )
                    )
                    .append(
                        $('<td>').append(
                            $('<a>')
                                .attr('href','#')
                                .addClass('link-delete')
                                .html('Удалить')
                        )
                    )
            );
        }
    }

    /**
     * Clears tableBody body
     */
    function clearTable(){
        $(tableBody).html("");
    }
});
