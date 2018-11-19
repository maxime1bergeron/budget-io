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
		const columns = this.props.columns;

		return ([
			<section className="overview overview-total">
				<div className="overview-scroller">
					<table className="overview-table" cellSpacing="0" cellPadding="0">
						<thead>
							<tr>
								<th className="overview-hidden">&nbsp;</th>
								{months.map((month, i) => (
									<th 
										key={"2-"+year+""+((i<9)?"0"+(i+1):(i+1))+"-month"} 
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
								<tr key={"2-"+year+"."+category.tag+"-row"} className="overview-data-row">
									<td key={"2-"+year+"."+category.tag+"-tag"} className={"overview-title-column overview-"+category.tag}>{category.name}</td>
									{months.map((column, j) => {
										const key = year+""+((j<9)?"0"+(j+1):(j+1))+"."+category.tag;
										return (											
											<td key={"2-"+key} className={"overview-"+category.tag} onClick={() => this.props.onClick(key)} >
												{this.getOverviewData(data, key)}
											</td>
										)
									})}
									<td key={"2-"+year+"."+category.tag} className={"overview-total-column overview-"+category.tag}>{this.getOverviewData(data, year+"."+category.tag)}</td>
								</tr>
							))}
							<tr key={"2-"+year+".spending"} className="overview-spending-row">
								<td key={"2-"+year+".spending-title"} className={"overview-spending-title"}>Dépenses</td>
								{months.map((column, j) => {
									const key = year+""+((j<9)?"0"+(j+1):(j+1))+".spending";
									return (											
										<td key={"2-"+key} className={"overview-spending"}>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
								<td key={"2-"+year+".spending-total"} className={"overview-spending-total"}>{this.getOverviewData(data, year+".spending")}</td>
							</tr>
							<tr key={"2-"+year+".revenue"} className="overview-revenue-row">
								<td key={"2-"+year+".revenue-title"} className={"overview-revenue-title"}>Revenus</td>
								{months.map((column, j) => {
									const key = year+""+((j<9)?"0"+(j+1):(j+1))+".revenue";
									return (											
										<td key={"2-"+key} className="overview-revenue">
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
								<td key={"2-"+year+".revenue-total"} className="overview-revenue-total">{this.getOverviewData(data, year+".revenue")}</td>
							</tr>
						</tbody>	
						<tfoot>
							<tr key={"2-"+year+".total-row"} className="overview-total-total-row">
								<td key={"2-"+year+".total-title"} className="overview-total-title">TOTAL</td>
								{months.map((column, j) => {
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
			<section className="overview">
				<div className="overview-scroller">
					<table className="overview-table" cellSpacing="0" cellPadding="0">
						<thead>
							<tr className="overview-title-row">
								<th className="overview-hidden	">&nbsp;</th>
								{categories.map((category, i) => (
									<th 
										key={year+"-"+category.tag} 
										colSpan={category.items} 
										className={"overview-"+category.tag}
									>
										{category.name}
									</th>
								))}
							</tr>
							<tr className="overview-subtitle-row">
								<td className="overview-year">{year}</td>
								{columns.map((column, i) => (
									<th 
										key={year+"-"+column.category+"-"+column.tag} 
										className={"overview-"+column.category}
									>
										{column.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{months.map((month, i) => (
								<tr key={year+""+((i<9)?"0"+(i+1):(i+1))} className="overview-data-row">
									<td className="overview-month">{month}</td>
									{columns.map((column, j) => {
										const key = year+""+((i<9)?"0"+(i+1):(i+1))+"."+column.category+"-"+column.tag;
										return (											
											<td key={key} className={"overview-"+column.category} onClick={() => this.props.onClick(key)} >
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
								{columns.map((column, i) => {
									const key = year+"."+column.category+"-"+column.tag;
									return (
										<td key={key} className={"overview-"+column.category}>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
							</tr>
							<tr className="overview-total-row">
								<td className="overview-hidden	">&nbsp;</td>
								{categories.map((category, i) => {
									const key = year+"."+category.tag
									return ([
										<td key={key+"-tag"} colSpan={category.items-1} className={"overview-"+category.tag+" overview-total-tag"}>
											Sous-Total
										</td>,
										<td key={key} className={"overview-"+category.tag+" overview-total-total"}>
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