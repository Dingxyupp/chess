$(function () {
    let box=$('.box');
    let flag=true;
    let white={};
    let black={};
    let blank={};
    let ai=true;
    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
            $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo(box);
            blank[i+'_'+j]=true;
        }
    }
    box.on('click','.chess',function () {
        flag=!flag;
        let _this=$(this);
        if(_this.hasClass('white')||_this.hasClass('black')){
            return;
        }
        if(!flag){
            let coords =$(this).attr('id');
            white[coords]=true;
            delete  blank[coords];
            $(this).addClass('white');
            if(isSuccess(white,coords)>=5){
                console.log('白棋胜');
                box.off('click');
            }
        }else{
            let coords =$(this).attr('id')
            black[coords]=true;
            delete  blank[coords];
            $(this).addClass('black');
            if(isSuccess(black,coords)>=5){
                console.log('黑棋胜');
                box.off('click')
            }
        }
        if(ai){
            let pos=aifn();
            black[pos]=true;
            delete blank[pos];
            $('#'+pos).addClass('black')
            if(isSuccess(black,pos)>=5){
                console.log('黑棋胜');
                box.off('click')
            }
        flag=!flag;
        }
    })
    function aifn() {
        let blankscore=0,whitescore=0;
        let pos1='',pos2='';
        for(let i in blank){
            let score =isSuccess(black,i);
            if(score>=blankscore){
                blankscore=score;
                pos1=i;
            }
        }
        for(let i in blank){
            let score =isSuccess(white,i);
            if(score>=whitescore){
                whitescore=score;
                pos2=i;
            }
        }
        return blankscore>=whitescore ? pos1 : pos2;
    }

    function isSuccess(obj,coords) {
        let [x,y]=coords.split('_');
        let sp=1,cz=1,zy=1,yy=1;
        let i=x*1,j=y*1;
        //sp
        while(obj[i+'_'+(++j)]){
            sp=sp+1;
        }
        j=y*1;
        while(obj[i+'_'+(--j)]){
           sp=sp+1;
        }
        j=y*1;
        //cz
        while(obj[(++i)+'_'+j]){
            cz=cz+1;
        }
        i=x*1;
        while(obj[(--i)+'_'+j]){
            cz=cz+1;
        }
        i=x*1;
        //yy
        while(obj[(++i)+'_'+(--j)]){
            yy=yy+1;
        }
        i=x*1,j=y*1;
        while(obj[(++i)+'_'+(++j)]){
            yy=yy+1;
        }
        i=x*1,j=y*1;
        //zy
        while(obj[(--i)+'_'+(--j)]){
            zy=zy+1;
        }
        i=x*1,j=y*1;
        while(obj[(--i)+'_'+(++j)]){
            zy=zy+1;
        }
        return Math.max(sp,cz,zy,yy);
    }
})