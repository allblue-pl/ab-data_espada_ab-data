'use strict';

const
    abData = require('ab-data'),
    js0 = require('js0'),

    f = abData.fields,
    v = abData.validators
;

module.exports = function (ds, tableId) {
    js0.args(arguments, abData.DataScheme, 'int');

    let dsFn = () => {
        ds
            .defT(tABData_DeletedRows)
            .defT(tABData_DeviceRequests)
            .defT(tABData_DeviceRows)
            .defT(tABData_Devices)
    }

    let tABData_DeletedRows = new abData.TableDef(tableId++, 'ABData_DeletedRows', 
            'abd_dlr', [
        [ 'TableId',            f.Int({ notNull: true }) ],
        [ 'RowId',              f.Long({ notNull: true }) ],
        [ '_Modified_DateTime', f.Long({ notNull: true }) ],
            ])
        .setPKs([ 'TableId', 'RowId' ])
        .setIndexes({
            '_Modified_DateTime': [ [ '_Modified_DateTime', true ] ],
        });

    let tABData_DeviceRequests = new abData.TableDef(tableId++, 'ABData_DeviceRequests', 
            'abd_drq', [
        [ 'DeviceId',   f.Int({ notNull: true }) ],
        [ 'RequestId',  f.Int({ notNull: true }) ],
            ])
        .setPKs([ 'DeviceId', 'RequestId' ])
        .setIndexes({
            'DeviceId': [ [ 'DeviceId', false ] ],
        });

    let tABData_DeviceRows = new abData.TableDef(tableId++, 'ABData_DeviceRows', 
            'abd_dvr', [
        [ 'DeviceId',   f.Int({ notNull: true, }) ],
        [ 'TableId',    f.Int({ notNull: true, }) ],
        [ 'RowId',      f.Long({ notNull: true, }) ],
            ])
        .setPKs([ 'DeviceId', 'TableId', 'RowId' ])
        .setIndexes({
            'DeviceId': [ [ 'DeviceId', false ] ],
        });

    let tABData_Devices = new abData.TableDef(tableId++, 'ABData_Devices', 
            'abd_d', [
        [ 'Id',                 f.Int({ notNull: true, }) ],
        [ 'ItemIds_Last',       f.Int({ notNull: true, }) ],
        [ 'SystemItemIds_Last', f.Int({ notNull: true, }) ],
        [ 'Hash',               f.String(64, { notNull: true, }) ],
        [ 'Expires',            f.Time({ notNull: false, }) ],
        [ 'LastSync',           f.Time({ notNull: false, }) ],
        [ 'DBSync',             f.Time({ notNull: false, }) ],
            ])
        .setPKs([ 'Id' ])
        .setIndexes({
            'Expires': [ [ 'Expires', true ] ],
        });

    dsFn();
};