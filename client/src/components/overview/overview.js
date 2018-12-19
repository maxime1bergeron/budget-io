import React from 'react';
import './overview.css';

class Overview extends React.Component {

	getOverviewData (data, key) {
		const amount = (data[key])? data[key] : 0;
		return amount.toFixed(2) + "$";
	}


	render () {

		const data = this.props.data;
		const year = this.props.year;	
		
		const months = this.props.months;
		const categories = this.props.categories;
		const subcategories = this.props.subcategories;

		return ([
			<section key="overview-table-totals" className="overview overview-total">
				<div className="overview-scroller">
					<table className="overview-table" cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="overview-hidden">&nbsp;</th>
								{months.map((month, i) => (
									<th 
										key={"2-"+year+""+((i<9)?"0"+(i+1):(i+1))+"-month"} 
										onClick={() => this.props.onClick(i)}
										className={"overview-month"}
									>
										{month}
									</th>
								))}
								<th className="overview-month">Total</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category, i) => (
								<tr key={"2-"+year+"."+category.name+"-row"} className="overview-data-row">
									<td key={"2-"+year+"."+category.name+"-cell"} className={"overview-title-subcategory overview-"+category.name}>{category.label}</td>
									{months.map((_, j) => {
										const key = year+""+((j<9)?"0"+(j+1):(j+1))+"."+category.name;
										return (											
											<td 
											key={"2-"+key} 
											className={"overview-"+category.name} 
											onClick={() => this.props.onClick(j, category.name)} >
												{this.getOverviewData(data, key)}
											</td>
										)
									})}
									<td key={"2-"+year+"."+category.name} className={"overview-total-subcategory overview-"+category.name}>{this.getOverviewData(data, year+"."+category.name)}</td>
								</tr>
							))}
							<tr key={"2-"+year+".spending"} className="overview-spending-row">
								<td key={"2-"+year+".spending-title"} className={"overview-spending-title"}>Dépenses</td>
								{months.map((_, j) => {
									const key = year+""+((j<9)?"0"+(j+1):(j+1))+".spending";
									return (											
										<td 
										key={"2-"+key} 
										className={"overview-spending"}
										onClick={() => this.props.onClick(j, "spending")}
										>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
								<td key={"2-"+year+".spending-total"} className={"overview-spending-total"}>{this.getOverviewData(data, year+".spending")}</td>
							</tr>
							<tr key={"2-"+year+".revenus"} className="overview-revenue-row">
								<td key={"2-"+year+".revenus-title"} className={"overview-revenue-title"}>Revenus</td>
								{months.map((_, j) => {
									const key = year+""+((j<9)?"0"+(j+1):(j+1))+".revenus";
									return (											
										<td 
										key={"2-"+key} 
										className="overview-revenue"
										onClick={() => this.props.onClick(j, "revenus")}
										>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
								<td key={"2-"+year+".revenus-total"} className="overview-revenus-total">{this.getOverviewData(data, year+".revenus")}</td>
							</tr>
						</tbody>	
						<tfoot>
							<tr key={"2-"+year+".total-row"} className="overview-total-total-row">
								<td key={"2-"+year+".total-title"} className="overview-total-title">TOTAL</td>
								{months.map((_, j) => {
									const key = year+""+((j<9)?"0"+(j+1):(j+1))+".total";
									return (											
										<td key={"2-"+key} className={"overview-total"}>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
								<td key={"2-"+year+".total"} className="overview-total-total">{this.getOverviewData(data, year+".total")}</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</section>,
			<section key="overview-table-details" className="overview">
				<div className="overview-scroller">
					<table className="overview-table" cellSpacing="0" cellPadding="0">
						<thead>
							<tr className="overview-title-row">
								<th className="overview-hidden	">&nbsp;</th>
								{categories.map((category, i) => (
									<th 
										key={year+"-"+category.name} 
										colSpan={category.items} 
										className={"overview-"+category.name}
									>
										{category.label}
									</th>
								))}
							</tr>
							<tr className="overview-subtitle-row">
								<td className="overview-year">{year}</td>
								{subcategories.map((subcategory, i) => (
									<th 
										key={year+"-"+subcategory.category+"-"+subcategory.name} 
										className={"overview-"+subcategory.category}
									>
										{subcategory.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{months.map((month, i) => (
								<tr key={year+""+((i<9)?"0"+(i+1):(i+1))} className="overview-data-row">
									<td 
									className="overview-month"
									onClick={() => this.props.onClick(i)} 
									>
										{month}
									</td>
									{subcategories.map((subcategory, j) => {
										const key = year+""+((i<9)?"0"+(i+1):(i+1))+"."+subcategory.category+"-"+subcategory.name;
										return (											
											<td 
											key={key} 
											className={"overview-"+subcategory.category} 
											onClick={() => this.props.onClick(i, subcategory.category, subcategory.name)} 
											>
												{this.getOverviewData(data, key)}
											</td>
										)
									})}
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="overview-subtotal-row">
								<td className="overview-subtotal">Sous-Total</td>
								{subcategories.map((subcategory, i) => {
									const key = year+"."+subcategory.category+"-"+subcategory.name;
									return (
										<td key={key} className={"overview-"+subcategory.category}>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
							</tr>
							<tr className="overview-total-row">
								<td className="overview-hidden	">&nbsp;</td>
								{categories.map((category, i) => {
									const key = year+"."+category.subcategory
									return ([
										<td key={key+"-subcategory"} colSpan={category.items-1} className={"overview-"+category.subcategory+" overview-total-subcategory"}>
											Sous-Total
										</td>,
										<td key={key} className={"overview-"+category.subcategory+" overview-total-total"}>
											{this.getOverviewData(data, key)}
										</td>
									])
								})}
							</tr>
						</tfoot>
					</table>
				</div>
			</section>
		]);
	}
}

export default Overview;