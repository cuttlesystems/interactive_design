<template>

    <div class="tree-container">
        
    </div>

</template>



<script setup lang="ts">

// import { ref, reactive, onMounted } from 'vue'
// import * as d3 from 'd3'

// const treeData = reactive({ 
//         name: 'Top level',
//         children: [
//             {
//                 name: 'Level 2 A',
//                 children: [
//                     {
//                         name: 'son of A'
//                     },
//                     {
//                         name: 'daughter of A'
//                     }
//                 ]
//             },
//             {
//                 name: 'Level 2 B'
//             }
//         ]
//     })

// const margin = {
//     top: 20,
//     right: 90,
//     bottom: 20,
//     left: 20
// }

// const width = 960 - margin.left - margin.right
// const height = 500 - margin.top - margin.bottom

// let i = 0, duration = 750, root,
//     treeMap = d3.tree().size([height,width]);



// onMounted(() => {

//     let svg = d3.select('.tree-container')
//         .append('svg').attr('width', width + margin.right + margin.left).attr('height', height + margin.top + margin.bottom)
//         .append('g').attr('transform', `translate(${margin.left},${margin.top})`)
    
//     root = d3.hierarchy(treeData,function (d) {
//         return d.children
//     })
    
//     root.x0 = height/2;
//     root.y0 = 0;

//     console.log({root});

//     (function dd(source) {
//         let treeData = treeMap(root)        // layout

//         const nodes = treeData.descendants()     // Array nodes
//         console.log(nodes,'nodes')
//         nodes.forEach(node => node.y = node.depth * 180);

//         const node = svg.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++ i))
//         const nodeEnter = node.enter().append('g').attr('class', 'node').attr('transform', () => `translate(${source.y0},${source.x0})`)
//             .on('click', click)

//         nodeEnter.append('circle').attr('class', 'node').attr('r', 0).style('fill', (d) => d._children ? 'red': 'black');

//         nodeEnter.append('text').attr('dy', '.35em').attr('x', function(d) {
//             return 13
//         }).text(function (d) {
//             return d.data.name
//         })

//         // links
//         const links = treeData.descendants().slice(1);
//         const link = svg.selectAll('path.link').data(links, function(d) {
//             return d.id
//         })
//         const linkEnter = link.enter().insert('path', 'g').attr('class','link').attr('d',function (d) {
//             const o = {
//                 x: source.x0,
//                 y: source.y
//             }
//             return createPath(o,o)
//         })
//         const updateLinks = linkEnter.merge(link)
//         updateLinks.transition().duration(duration).attr('d', function (d) {
//             return createPath(d,d.parent)
//         })
//         const linkExit = link.exit().transition().duration(duration).attr('d',function(d) {
//             const o = {
//                 x: source.x0,
//                 y: source.y0
//             }
//             return createPath(o,o)
//         }).remove()

//         function createPath(s,d){
//             const path = `M ${s.y} ${s.x}
//                 C ${(s.y + d.y)/2} ${s.x}
//                   ${(s.y + d.y)/2} ${d.x}
//                   ${d.y} ${d.x}
//             `
//             return path
//         }

//         const nodeUpdate = nodeEnter.merge(node)
//         nodeUpdate.transition().duration(duration).attr('transform', (d) => `translate(${d.y},${d.x})`)
        
//         const nodeExit = node.exit().transition().duration(duration).attr('transform', function(d) {
//             return `translate(${source.y},${source.x})`
//         }).remove();

//         nodeExit.select('circle').attr('r',0);
//         nodeExit.select('text').style('fill-opacity', 0);


//         nodeUpdate.select('circle.node').attr('r', 10).style('fill', (d) => d._children ? 'red': 'black').attr('cursor','pointer')
//         nodes.forEach((d) => {
//             d.x0 = d.x
//             d.y0 = d.y
//         })      // old position

//         function click (ev, d) {
//             if(d.children) {
//                 d._children = d.children
//                 d.children = null
//             }else {
//                 d.children = d._children
//                 d._children = null
//             }
//             dd(d)
//         }
//     })(root)

// });







</script>



<style lang="scss">
    
</style>