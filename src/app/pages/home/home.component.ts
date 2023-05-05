import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import * as d3 from 'd3';

@Component({
  selector: 'ngx-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.createDiagram();
  }
  
  private createDiagram(): void {
    // Define the data for the diagram
    const nodes = [
      { id: 1, name: 'Process 1' },
      { id: 2, name: 'Process 2' },
      { id: 3, name: 'Process 3' },
    ];
  
    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
    ];
  
    // Set up the diagram dimensions
    const width = 500;
    const height = 300;
  
    // Create the SVG container
    const svg = d3.select('.d3-diagram')
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    // Create arrow markers for the links
    svg.append("defs").selectAll("marker")
      .data(["end"])
      .enter().append("marker")
      .attr("id", String)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -1.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5");
  
    // Draw the links
    const link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .attr("x1", (d) => (d.source - 1) * width / nodes.length + 50)
      .attr("y1", height / 2)
      .attr("x2", (d) => (d.target - 1) * width / nodes.length + 50)
      .attr("y2", height / 2)
      .attr("marker-end", "url(#end)")
      .style("stroke", "black")
      .style("stroke-width", 2);
  
    // Draw the nodes
    const node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => "translate(" + ((d.id - 1) * width / nodes.length + 50) + "," + (height / 2) + ")");
  
    // Draw node rectangles
    node.append("rect")
      .attr("width", 100)
      .attr("height", 50)
      .attr("rx", 5)
      .attr("ry", 5)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 2);
  
    // Add node labels
    node.append("text")
      .attr("dx", 50)
      .attr("dy", 25)
      .attr("text-anchor", "middle")
      .text((d) => d.name)
      .style("fill", "black")
      .style("font-size", "14px");

    // Animate the flow by adding circles that move along the arrows
    const flow = svg.selectAll(".flow")
      .data(links)
      .enter().append("circle")
      .attr("class", "flow")
      .attr("r", 5)
      .attr("fill", "red")
      .attr("cx", (d) => (d.source - 1) * width / nodes.length + 50)
      .attr("cy", height / 2);

    // Define the animation
    function animateFlow() {
      flow.transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("cx", (d) => (d.target - 1) * width / nodes.length + 50)
        .on("end", resetFlow);
    }

    // Reset the flow to its starting position
    function resetFlow() {
      flow.attr("cx", (d) => (d.source - 1) * width / nodes.length + 50);
      animateFlow();
    }

    // Start the animation
    animateFlow();
  }  
}
