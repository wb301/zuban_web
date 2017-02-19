/**
 * Created by moon on 16/8/31.
 */
var webpack = require('webpack')

//增加全局依赖
var plugins = [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        'GlobalModel': 'src/lib/common/GlobalHelper.js',
        'AjaxHelper': 'src/lib/common/AjaxHelper.js',
        'BrowserHelper': 'src/lib/common/BrowserHelper.js',
        'ImageHelper': 'src/lib/common/ImageHelper.js',
        'NormalHelper': 'src/lib/common/NormalHelper.js',
        'SaveDataHelper': 'src/lib/common/SaveDataHelper.js',
        'EventTrackHelper': 'src/lib/common/EventTrackHelper.js'
    })
];

module.exports = {
    plugins: plugins
}
