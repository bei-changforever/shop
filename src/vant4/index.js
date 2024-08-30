import {
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph, Card, SwipeCell, Button, ActionBar, Dialog, AddressList, AddressEdit, Notify, Form, Stepper, ActionBarIcon, ActionBarButton, SubmitBar, Search, Popup, Icon, Image as VanImage, Lazyload, Tabbar, TabbarItem, Swipe, SwipeItem, List, Empty, NavBar, Grid, GridItem, ImagePreview, DropdownMenu, DropdownItem, Field, CellGroup, Checkbox, CheckboxGroup, BackTop, Collapse, CollapseItem
} from 'vant';


const UIComponents = [Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph, Card, SwipeCell, Button, ActionBar, Dialog, AddressList, AddressEdit, Notify, Form, Stepper, ActionBarIcon, ActionBarButton, SubmitBar, Search, Popup, Icon, VanImage, Lazyload, Tabbar, TabbarItem, Swipe, SwipeItem, List, Empty, NavBar, Grid, GridItem, ImagePreview, DropdownMenu, DropdownItem, Field, CellGroup, Checkbox, CheckboxGroup, BackTop, Collapse, CollapseItem]
// 引入弹出框样式
import 'vant/es/dialog/style';

const VantUIPlugin = {};
import 'vant/es/toast/style';
import 'vant/es/notify/style';

VantUIPlugin.install = function (app) {

    UIComponents.forEach(Component => {

        app.use(Component)

    })
}

export default VantUIPlugin