import * as d3 from 'd3';
import {HierarchyPointLink, HierarchyPointNode} from 'd3';
import {BTree, BTreeImpl, BTreeVisualNode, BTreeVisualNodeImpl} from './BTreeTypes';

function drawTree(treeData: BTree): void {
    const container = d3.select("#tree-container");

    const containerWidth = (container.node() as Element).getBoundingClientRect().width;
    const containerHeight = (container.node() as Element).getBoundingClientRect().height;

    const margin = {top: 20, right: 120, bottom: 20, left: 120};
    const width = containerWidth - margin.right - margin.left;
    const height = (containerHeight || 800) - margin.top - margin.bottom;


    const treeLayout = d3.tree<BTreeVisualNode>()
        .size([height, width]);
    const svg = container
        .append("svg")
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    // Convert the BTree to a D3 hierarchy
    const root = d3.hierarchy<BTreeVisualNode>(treeData.root, (d: BTreeVisualNode) => d.children);

    // Assign the x and y positions for the nodes
    const tree = treeLayout(root);

    // Update the BTreeVisualNode with the new `x` and `y` values from D3
    root.each((d) => {
        d.data.x = d.x;
        d.data.y = d.y;
    });

    // Add links between nodes
    const links = svg
        .selectAll('.link')
        .data(tree.links() as HierarchyPointLink<BTreeVisualNode>[])  // Ensure correct typing
        .enter().append('path')
        .attr('class', 'link')
        .attr(
            'd',
            d3
                .linkHorizontal<HierarchyPointLink<BTreeVisualNode>, HierarchyPointNode<BTreeVisualNode>>()
                .x((d: HierarchyPointNode<BTreeVisualNode>) => d.data.y)
                .y((d: HierarchyPointNode<BTreeVisualNode>) => d.data.x)
        );

    // Add nodes
    const nodes  = svg.selectAll('.node')
        .data(tree.descendants() as HierarchyPointNode<BTreeVisualNode>[])  // Ensure correct typing
        .enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: HierarchyPointNode<BTreeVisualNode>) => `translate(${d.data.y},${d.data.x})`);

    // Add circles for each node
    nodes.append('circle')
        .attr('r', 10);

    // Add labels for each node
    nodes.append('text')
        .attr('dy', '.35em')
        .attr('x', (d: HierarchyPointNode<BTreeVisualNode>) => d.data.children ? -13 : 13)
        .style('text-anchor', (d: HierarchyPointNode<BTreeVisualNode>) => d.data.children ? 'end' : 'start')
        .text((d: HierarchyPointNode<BTreeVisualNode>) => d.data.keys.join(', '));
}

let level1Children: BTreeVisualNode[] = []
const root: BTreeVisualNode = new BTreeVisualNodeImpl(
        "5515084e-7a09-46c3-bd61-e2c436eb7424",
        1,
        [4, 9, 15],
        null,
        level1Children,
    true,
    false
);
const child1: BTreeVisualNode = new BTreeVisualNodeImpl(
    "ca1561df-98a3-477c-b65b-50054e5ef6c8",
    1,
    [1, 2, 3],
    root,
    null,
    true,
    true
);
const child2: BTreeVisualNode = new BTreeVisualNodeImpl(
    "99b9f27c-9383-4e4a-9962-b38fdec9db8e",
    1,
    [5, 6, 8],
    root,
    null,
    true,
    true
);
const child3: BTreeVisualNode = new BTreeVisualNodeImpl(
    "7dfb84c8-2083-499d-bffa-5aaf9861b2e1",
    1,
    [10, 11, 14],
    root,
    null,
    true,
    true
);
const child4: BTreeVisualNode = new BTreeVisualNodeImpl(
    "fac1b1e7-f18e-4b5e-9729-9cac9b1b4090",
    1,
    [18, 21, 22],
    root,
    null,
    true,
    true
);
level1Children.push(child1);
level1Children.push(child2);
level1Children.push(child3);
level1Children.push(child4);

drawTree(new BTreeImpl(root));